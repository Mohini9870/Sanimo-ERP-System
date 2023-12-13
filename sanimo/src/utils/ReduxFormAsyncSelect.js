import axios from "axios";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

import { base_url } from "actions/baseUrls";
import { getUserDetails } from "reducers/user";

import stringifyQueryParams from "./stringifyQueryParams";

export const ReduxFormAsyncSelect = props => {
	const {
		input,
		disabled,
		touched,
		error,
		masterDropdownName,
		isMulti = false,
		isClearable = false,
		label = null,
		query = {},
	} = props;

	const { token, userId, selectedCompanyId } = useSelector(getUserDetails);

	const config = {
		headers: {
			"Content-Type": "application/json",
			"Session-Token": token,
			"Company-Id": selectedCompanyId,
		},
	};

	const loadDropdownValues = debounce((inputValue, callback) => {
		const queryString = stringifyQueryParams({
			...query,
			name: inputValue,
			dropdown: 1,
			status: 2,
			sort: "id",
		});
		axios
			.get(
				`${base_url}/v1/user/${userId}/${masterDropdownName}/list?${queryString}`,
				config
			)
			.then(res => {
				callback(res.data.data.results);
			});
	}, 500);

	return (
		<>
			{label && <label className="form-label">{label}</label>}
			<AsyncSelect
				{...input}
				onBlur={() => {
					input.onBlur(input.value);
				}}
				defaultOptions
				loadOptions={loadDropdownValues}
				isMulti={isMulti}
				isDisabled={disabled}
				isClearable={isClearable}
			/>
			{touched && error && (
				<span style={{ color: "red", marginLeft: "4px" }}>{error}</span>
			)}
		</>
	);
};
