import React, {useState} from 'react';
import {useCreateDevice} from "../apiHooks/useCreateDevice/index.js";
import {useDeviceDetail} from "../apiHooks/useDeviceDetail/index.jsx";
import {useDeviceUpdate} from "../apiHooks/useDeviceUpdate/index.jsx";
import {validateForm} from "../useValidateForm/index.jsx";

export const useDeviceForm = (deviceId = null) => {
		const [formErrors, setFormErrors] = React.useState({
				system_name: '',
				type: '',
				hdd_capacity: '',
			})

		;
		const {data: deviceDetail} = useDeviceDetail(deviceId || '', {enabled: !!deviceId});

		const {mutateAsync: updateDevice} = useDeviceUpdate();
		const {mutateAsync: createDevice} = useCreateDevice();

		const [formData, setFormData] = useState({
			system_name: '',
			type: '',
			hdd_capacity: '',
		});

		const onChangeTextField = (event) => {
			const {name, value} = event.target;

			setFormErrors((prevState) => ({
				...prevState,
				[name]: '',
			}));

			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		};

		const onChangeDropdown = (selectedValue) => {
			setFormErrors((prevState) => ({
				...prevState,
				[selectedValue.name]: '',
			}));

			setFormData((prevState) => ({
				...prevState,
				[selectedValue.name]: selectedValue.type,
			}));
		};

		const clearForm = () => setFormData({
			system_name: '',
			type: '',
			hdd_capacity: '',
		});

		const mutateDevice = async () => {
			if (deviceId) {
				return await updateDevice({id: deviceId, ...formData});
			} else {
				return await createDevice(formData);
			}
		};

		const handleSubmit = async () => {
			const errors = validateForm(formData);

			const hasErrors = Object.values(errors).some((error) => error.length > 0);

			if (hasErrors) {
				setFormErrors(errors);
				return {status: 'formInvalid'};
			}

			try {
				await mutateDevice();
				return {status: 'success'};
			} catch (error) {
				return {status: 'error', message: error.message};
			}
		};

		React.useEffect(() => {
			if (deviceDetail) {
				setFormData({
					system_name: deviceDetail.system_name,
					type: deviceDetail.type,
					hdd_capacity: String(deviceDetail.hdd_capacity),
				});
			}
		}, [deviceDetail]);

		return {
			formData,
			clearForm,
			onChangeDropdown,
			onChangeTextField,
			handleSubmit,
			formErrors,
			setFormErrors
		};
	}
;
