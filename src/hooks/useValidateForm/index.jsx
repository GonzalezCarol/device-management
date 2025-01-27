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
	const rules = validationRules[fieldName]?.validate;

	if (rules) {
		const errors = rules
			.map(rule => rule(fieldValue))
			.filter(error => error !== true);

		return errors.length > 0 ? errors[0] : '';
	}

	return '';
};


export const validateForm = (formData) => {
	return Object.keys(formData).reduce((acc, field) => {
		const error = validateField(field, formData[field]);
		if (error) acc[field] = error;
		return acc;
	}, {});
};
