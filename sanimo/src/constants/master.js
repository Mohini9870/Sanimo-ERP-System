import { createRequestTypes } from "utils/createRequestTypes";

export const GET_MASTER_LIST = createRequestTypes("GET_MASTER_LIST");
export const ADD_MASTER_LIST = createRequestTypes("ADD_MASTER_LIST");
export const EDIT_MASTER_LIST = createRequestTypes("EDIT_MASTER_LIST");
export const EXPORT_MASTER = createRequestTypes("EXPORT_MASTER");
export const IMPORT_MASTER = createRequestTypes("IMPORT_MASTER");

// export const GET_DROPDOWN_LIST = createRequestTypes("GET_DROPDOWN_LIST");

export const stateOptions = [
	{ label: "Andaman and Nicobar", value: "Andaman and Nicobar" },
	{ label: "Andhra Pradesh", value: "Andhra Pradesh" },
	{ label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
	{ label: "Assam", value: "Assam" },
	{ label: "Bihar", value: "Bihar" },
	{ label: "Chandigarh", value: "Chandigarh" },
	{ label: "Chhattisgarh", value: "Chhattisgarh" },
	{ label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
	{ label: "Daman and Diu", value: "Daman and Diu" },
	{ label: "Delhi", value: "Delhi" },
	{ label: "Goa", value: "Goa" },
	{ label: "Gujarat", value: "Gujarat" },
	{ label: "Haryana", value: "Haryana" },
	{ label: "Himachal Pradesh", value: "Himachal Pradesh" },
	{ label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
	{ label: "Jharkhand", value: "Jharkhand" },
	{ label: "Karnataka", value: "Karnataka" },
	{ label: "Kerala", value: "Kerala" },
	{ label: "Lakshadweep", value: "Lakshadweep" },
	{ label: "Madhya Pradesh", value: "Madhya Pradesh" },
	{ label: "Maharashtra", value: "Maharashtra" },
	{ label: "Manipur", value: "Manipur" },
	{ label: "Meghalaya", value: "Meghalaya" },
	{ label: "Mizoram", value: "Mizoram" },
	{ label: "Nagaland", value: "Nagaland" },
	{ label: "Odisha", value: "Odisha" },
	{ label: "Puducherry", value: "Puducherry" },
	{ label: "Punjab", value: "Punjab" },
	{ label: "Rajasthan", value: "Rajasthan" },
	{ label: "Sikkim", value: "Sikkim" },
	{ label: "Tamil Nadu", value: "Tamil Nadu" },
	{ label: "Telangana", value: "Telangana" },
	{ label: "Tripura", value: "Tripura" },
	{ label: "Uttar Pradesh", value: "Uttar Pradesh" },
	{ label: "Uttarakhand", value: "Uttarakhand" },
	{ label: "West Bengal", value: "Bengal" },
];
