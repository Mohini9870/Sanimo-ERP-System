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
	getLotMasterList,
	getLotPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { lotModalName, masterName } from "./lotConstants";
import LotModal from "./LotModal";

const Lot = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const lotList = useSelector(getLotMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getLotPagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getLotData = useCallback(
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
		useMasterLogic(getLotData, lotModalName);

	const columns = [
		{
			title: "Lot Number",
			dataIndex: "lot_no",
			key: "lot_no",
		},
		{
			title: "Quality Name",
			dataIndex: ["yarn_quality", "name"],
			key: ["yarn_quality", "name"],
		},
		{
			title: "Supplier Name",
			dataIndex: ["supplier", "name"],
			key: ["supplier", "name"],
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
									editMasterList(
										masterName,
										{
											...data,
											yarn_quality_id: data?.yarn_quality?.id,
											supplier_id: data?.supplier?.id,
											status: 2,
										},
										status
									)
								),
						},
						{
							label: "Reject",
							onClick: () =>
								dispatch(
									openModal(rejectModalName, {
										...data,
										yarn_quality_id: data?.yarn_quality?.id,
										supplier_id: data?.supplier?.id,
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
										{
											...data,
											yarn_quality_id: data?.yarn_quality?.id,
											supplier_id: data?.supplier?.id,
											is_active: false,
										},
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
				modalName={lotModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={lotList}
				columns={columns}
				rowKey={lotList => lotList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{lotList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<LotModal />
		</>
	);
};

export default Lot;
