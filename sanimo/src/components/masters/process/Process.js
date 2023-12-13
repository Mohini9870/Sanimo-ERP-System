import { Table } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { editMasterList, getMasterList } from "actions/master";
import { openModal } from "actions/modal";
import CustomPagination from "components/CustomPagination";
import { rejectModalName } from "components/masters/rejectModal/RejectModal";
import StatusSegments from "components/StatusSegments";
import TableOptions from "components/TableOptions";
import useMasterLogic from "customHooks/useMasterLogic";
import {
	getIsFetchingMasterList,
	getProcessMasterList,
	getProcessPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { masterName, processModalName } from "./processConstants";
import ProcessModal from "./ProcessModal";

const Process = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const processList = useSelector(getProcessMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getProcessPagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getProcessData = useCallback(
		(pageNum = 1, itemsPerPage = 10) => {
			dispatch(
				getMasterList(masterName, {
					page: pageNum,
					page_size: itemsPerPage,
					status,
				})
			);
		},
		[status, dispatch]
	);

	const { handleMasterEdit, handlePageChange, handleViewMaster } =
		useMasterLogic(getProcessData, processModalName);

	const columns = [
		{
			title: "Process Code",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Process Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Actions",
			key: "Actions",
			dataIndex: "action",
			render: (_, data) => {
				const items = [
					{
						label: "View",
						onClick: () => handleViewMaster(data),
					},
				];
				// Approved && Pending
				if (+status === 1 || +status === 2)
					items.push({
						label: "Edit",
						onClick: () => handleMasterEdit(data),
					});
				// Pending
				if (+status === 1)
					items.push(
						{
							label: "Approve",
							onClick: () =>
								dispatch(
									editMasterList(masterName, { ...data, status: 2 }, status)
								),
						},
						{
							label: "Reject",
							onClick: () =>
								dispatch(
									openModal(rejectModalName, {
										...data,
										status: 3,
										masterName,
										currentStatus: status,
									})
								),
						}
					);
				// Rejected
				if (+status === 3)
					items.push(
						{
							label: "Re-submit",
							onClick: () =>
								handleMasterEdit({ ...data, reject_reason: null, status: 1 }),
						},
						{
							label: "Delete",
							onClick: () =>
								dispatch(
									editMasterList(
										masterName,
										{ ...data, reject_reason: null, is_active: false },
										status
									)
								),
						}
					);
				return renderActions(items);
			},
		},
	];

	if (+status === 3) {
		columns.splice(columns?.length - 1, 0, {
			title: "Reject Reason",
			dataIndex: "reject_reason",
			key: "reject_reason",
		});
	}

	return (
		<>
			<TableOptions
				masterName={masterName}
				modalName={processModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={processList}
				columns={columns}
				rowKey={processList => processList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{processList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<ProcessModal />
		</>
	);
};

export default Process;
