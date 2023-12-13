//
// This function does exactly same as querystring.stringify method
// except it also removes all empty parameters
//
export default function stringifyQueryParams(params) {
	const filteredParams = Object.keys(params).reduce((newParams, key) => {
		if (
			typeof params[key] !== "undefined" &&
			params[key] !== "" &&
			params[key] !== []
		) {
			return {
				...newParams,
				[key]: params[key],
			};
		}

		return newParams;
	}, {});

	return new URLSearchParams(filteredParams).toString();
}
