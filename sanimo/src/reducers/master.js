import {
	ADD_MASTER_LIST,
	EDIT_MASTER_LIST,
	GET_MASTER_LIST,
	IMPORT_MASTER,
} from "constants/master";

const initialState = {
	isFetchingMasterList: false,
	isUpdatingMasterList: false,
	isFetchingDropdownList: false,
	// company
	companyMasterList: [],
	companyPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// party
	partyMasterList: [],
	partyPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// transport
	transportMasterList: [],
	transportPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// department
	departmentMasterList: [],
	departmentPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// process
	processMasterList: [],
	processPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// denier
	denierMasterList: [],
	denierPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// filament
	filamentMasterList: [],
	filamentPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// count
	countMasterList: [],
	countPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// shade
	shadeMasterList: [],
	shadePagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// lot
	lotMasterList: [],
	lotPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// yarn quality
	"yarn-qualityMasterList": [],
	"yarn-qualityPagination": {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// common
	"yarn-qualityDropdownList": [],
	partyDropdownList: [],
	shadeDropdownList: [],
	isImportingMaster: false,

	// raw material
	// grn
	grnMasterList: [],
	grnPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// repacking
	repackingMasterList: [],
	repackingPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
	// stock
	stockMasterList: [],
	stockPagination: {
		pageSize: 10,
		totalElements: 10,
		currentPage: 1,
	},
};

export const getIsUpdatingMasterList = state => {
	return state?.masterDetails?.isUpdatingMasterList;
};

export const getIsFetchingMasterList = state => {
	return state?.masterDetails?.isFetchingMasterList;
};

export const getIsFetchingDropdownList = state => {
	return state?.masterDetails?.isFetchingDropdownList;
};

//company
export const getCompanyMasterList = state => {
	return state?.masterDetails?.companyMasterList;
};

export const getCompanyPagination = state => {
	return state?.masterDetails?.companyPagination;
};

//party
export const getPartyMasterList = state => {
	return state?.masterDetails?.partyMasterList;
};

export const getPartyPagination = state => {
	return state?.masterDetails?.partyPagination;
};

//transport
export const getTransportMasterList = state => {
	return state?.masterDetails?.transportMasterList;
};

export const getTransportPagination = state => {
	return state?.masterDetails?.transportPagination;
};

//department
export const getDepartmentMasterList = state => {
	return state?.masterDetails?.departmentMasterList;
};

export const getDepartmentPagination = state => {
	return state?.masterDetails?.departmentPagination;
};

//process
export const getProcessMasterList = state => {
	return state?.masterDetails?.processMasterList;
};

export const getProcessPagination = state => {
	return state?.masterDetails?.processPagination;
};

//denier
export const getDenierMasterList = state => {
	return state?.masterDetails?.denierMasterList;
};

export const getDenierPagination = state => {
	return state?.masterDetails?.denierPagination;
};

//filament
export const getFilamentMasterList = state => {
	return state?.masterDetails?.filamentMasterList;
};

export const getFilamentPagination = state => {
	return state?.masterDetails?.filamentPagination;
};

//count
export const getCountMasterList = state => {
	return state?.masterDetails?.countMasterList;
};

export const getCountPagination = state => {
	return state?.masterDetails?.countPagination;
};

//shade
export const getShadeMasterList = state => {
	return state?.masterDetails?.shadeMasterList;
};

export const getShadePagination = state => {
	return state?.masterDetails?.shadePagination;
};

//lot
export const getLotMasterList = state => {
	return state?.masterDetails?.lotMasterList;
};

export const getLotPagination = state => {
	return state?.masterDetails?.lotPagination;
};

//yarnQuality
export const getYarnQualityMasterList = state => {
	return state?.masterDetails?.["yarn-qualityMasterList"];
};

export const getYarnQualityPagination = state => {
	return state?.masterDetails?.["yarn-qualityPagination"];
};

// import
export const getIsImportingMaster = state => {
	return state?.masterDetails?.isImportingMaster;
};

// common
export const getYarnQualityDropdownList = state => {
	return state?.masterDetails?.["yarn-qualityDropdownList"];
};

export const getPartyDropdownList = state => {
	return state?.masterDetails?.partyDropdownList;
};

export const getShadeDropdownList = state => {
	return state?.masterDetails?.shadeDropdownList;
};

// grn
export const getGrnMasterList = state => {
	return state?.masterDetails?.grnMasterList;
};

export const getGrnPagination = state => {
	return state?.masterDetails?.grnPagination;
};

// repacking
export const getRepackingMasterList = state => {
	return state?.masterDetails?.repackingMasterList;
};

export const getRepackingPagination = state => {
	return state?.masterDetails?.repackingPagination;
};

// stock
export const getStockMasterList = state => {
	return state?.masterDetails?.stockMasterList;
};

export const getStockPagination = state => {
	return state?.masterDetails?.stockPagination;
};

export const masterReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_MASTER_LIST.REQUEST:
			return { ...state, isFetchingMasterList: true };
		case GET_MASTER_LIST.SUCCESS:
			const {
				data: { data },
				query,
				masterName,
			} = payload;
			return {
				...state,
				isFetchingMasterList: false,
				[`${masterName}MasterList`]: data?.results,
				[`${masterName}Pagination`]: {
					currentPage: query?.page,
					pageSize: query?.page_size,
					totalElements: data?.count,
				},
			};
		case GET_MASTER_LIST.FAILURE:
			return { ...state, isFetchingMasterList: false };

		case EDIT_MASTER_LIST.REQUEST:
		case ADD_MASTER_LIST.REQUEST:
			return { ...state, isUpdatingMasterList: true };
		case ADD_MASTER_LIST.SUCCESS:
		case EDIT_MASTER_LIST.SUCCESS:
		case ADD_MASTER_LIST.FAILURE:
		case EDIT_MASTER_LIST.FAILURE:
			return {
				...state,
				isUpdatingMasterList: false,
			};

		// case GET_DROPDOWN_LIST.REQUEST:
		// 	return { ...state, isFetchingDropdownList: true };
		// case GET_DROPDOWN_LIST.SUCCESS:
		// 	return {
		// 		...state,
		// 		isFetchingDropdownList: false,
		// 		[`${payload?.masterName}DropdownList`]: payload?.data?.data?.results,
		// 	};
		// case GET_DROPDOWN_LIST.FAILURE:
		// 	return { ...state, isFetchingDropdownList: false };

		case IMPORT_MASTER.REQUEST:
			return { ...state, isImportingMaster: true };
		case IMPORT_MASTER.SUCCESS:
			return {
				...state,
				isImportingMaster: false,
			};
		case IMPORT_MASTER.FAILURE:
			return { ...state, isImportingMaster: false };

		default:
			return state;
	}
};
