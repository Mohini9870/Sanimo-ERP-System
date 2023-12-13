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
	getTransportMasterList,
	getTransportPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { masterName, transportModalName } from "./transportConstants";
import TransportModal from "./TransportModal";

const Transport = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const transportList = useSelector(getTransportMasterList);
	const { pageSize, totalElements, currentPage } = useSelector(
		getTransportPagination
	);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getTransportData = useCallback(
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
		useMasterLogic(getTransportData, transportModalName);

	const columns = [
		{
			title: "Transporter Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "State",
			dataIndex: "state",
			key: "state",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Contact Person",
			dataIndex: "contact_person",
			key: "contact_person",
		},
		{
			title: "Mobile Number",
			dataIndex: "mobile",
			key: "mobile",
		},
		{
			title: "GSTIN",
			dataIndex: "gstin",
			key: "gstin",
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
				modalName={transportModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={transportList}
				columns={columns}
				rowKey={transportList => transportList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{transportList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<TransportModal />
		</>
	);
};

export default Transport;
