import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openModal } from "actions/modal";
import { getUserDetails } from "reducers/user";
import usePrevious from "./usePrevious";

const useMasterLogic = (getMasterData, masterModalName) => {
	const dispatch = useDispatch();

	const { selectedCompanyId } = useSelector(getUserDetails);
	const previousSelectedCompanyId = usePrevious(selectedCompanyId);

	useEffect(() => {
		getMasterData(1, 10, {});
	}, [getMasterData]);

	useEffect(() => {
		if (
			previousSelectedCompanyId &&
			selectedCompanyId !== previousSelectedCompanyId
		) {
			getMasterData(1, 10, {});
		}
	}, [selectedCompanyId, getMasterData, previousSelectedCompanyId]);

	const handleViewMaster = master => {
		dispatch(openModal(masterModalName, { ...master, isViewOnly: true }));
	};

	const handleMasterEdit = master => {
		dispatch(openModal(masterModalName, master));
	};

	const handlePageChange = (pageNum, itemsPerPage) => {
		getMasterData(pageNum, itemsPerPage);
	};

	return { handleMasterEdit, handlePageChange, handleViewMaster };
};

export default useMasterLogic;
