import React, {useState} from 'react';
import {useCreateDevice} from "../apiHooks/useCreateDevice/index.js";
// import {useDeviceDetail} from '../useDeviceDetail';
// import {useDeviceUpdate} from '../useDeviceUpdate';
// import {useCreateDevice} from '../useCreateDevice';


const validationRules = {
	system_name: {
		validate: [(value) => value.length > 0 ? true : 'System name is required.'],
	},
	type: {
		validate: [(value) => value.length > 0 ? true : 'Type is required.'],
	},
	hdd_capacity: {
		validate: [(value) => value.length > 0 ? true : 'HDD capacity is required.'],
	},
};

const validateField = (fieldName, fieldValue) => {
	const rules = validationRules[fieldName]?.validate;  // Access the validate array

	if (rules) {
		const errors = rules
			.map(rule => rule(fieldValue))
			.filter(error => error !== true);

		return errors.length > 0 ? errors[0] : '';
	}

	return '';
};


const validateForm = (formData) => {
	return Object.keys(formData).reduce((acc, field) => {
		const error = validateField(field, formData[field]);
		if (error) acc[field] = error;  // Collect the error for the field
		return acc;
	}, {});
};


export const useDeviceForm = (deviceId = null) => {
		const [formErrors, setFormErrors] = React.useState({
				system_name: '',
				type: '',
				hdd_capacity: '',
			})

		;
		// const {data: deviceDetail} = useDeviceDetail(deviceId || '', {enabled: !!deviceId});

		// const {mutateAsync: updateDevice} = useDeviceUpdate();
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
				// return await updateDevice({id: deviceId, ...formData});
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

// React.useEffect(() => {
// 	if (deviceDetail) {
// 		setFormData({
// 			system_name: deviceDetail.system_name,
// 			type: deviceDetail.type,
// 			hdd_capacity: String(deviceDetail.hdd_capacity),
// 		});
// 	}
// }, [deviceDetail]);

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
