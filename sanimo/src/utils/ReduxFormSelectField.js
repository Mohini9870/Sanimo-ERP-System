import Select from "react-select";

export const ReduxFormSelectField = props => {
	const {
		input,
		options,
		disabled,
		touched,
		error,
		placeholder,
		label = null,
		isMulti = false,
	} = props;
	return (
		<>
			{label && <label className="form-label">{label}</label>}
			<Select
				{...input}
				onChange={val =>
					isMulti
						? input?.onChange(val.map(c => c.value))
						: input?.onChange(val.value)
				}
				value={
					isMulti
						? options?.filter(c => input?.value?.includes(c?.value))
						: options?.find(c => c?.value === input?.value)
				}
				onBlur={() => input.onBlur(input.value)}
				options={options}
				isMulti={isMulti}
				isDisabled={disabled}
				placeholder={placeholder}
			/>
			{touched && error && (
				<span style={{ color: "red", marginLeft: "4px" }}>{error}</span>
			)}
		</>
	);
};
