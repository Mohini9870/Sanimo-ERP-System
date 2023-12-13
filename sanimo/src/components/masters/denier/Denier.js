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
	getDenierMasterList,
	getDenierPagination,
	getIsFetchingMasterList,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { denierModalName, masterName } from "./denierConstants";
import DenierModal from "./DenierModal";

const Denier = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const denierList = useSelector(getDenierMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getDenierPagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getDenierData = useCallback(
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
		useMasterLogic(getDenierData, denierModalName);

	const columns = [
		{
			title: "Denier",
			dataIndex: "denier",
			key: "denier",
			width: 350,
		},
		{
			title: "Actions",
			key: "Actions",
			dataIndex: "action",
			width: 250,
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
										{ ...data, is_active: false },
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
				modalName={denierModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<div className="d-flex justify-content-center mt-3 mb-3">
				<Table
					dataSource={denierList}
					columns={columns}
					rowKey={denierList => denierList?.id}
					pagination={false}
					loading={isFetchingMasterList}
					size="small"
					bordered
					style={{ maxWidth: 800 }}
				/>
			</div>
			{denierList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<DenierModal />
		</>
	);
};

export default Denier;
