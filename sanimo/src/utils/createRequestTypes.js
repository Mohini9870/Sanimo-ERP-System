export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export const createRequestTypes = base =>
	[REQUEST, SUCCESS, FAILURE].reduce(
		(types, type) => ({
			...types,
			[type]: `${base}_${type}`,
		}),
		{}
	);
