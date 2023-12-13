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
	getPartyMasterList,
	getPartyPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { masterName, partyModalName } from "./partyConstants";
import PartyModal from "./PartyModal";

const Party = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const partyList = useSelector(getPartyMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getPartyPagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getPartyData = useCallback(
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
		useMasterLogic(getPartyData, partyModalName);

	const columns = [
		{
			title: "Party Type",
			dataIndex: "party_type",
			key: "party_type",
		},
		{
			title: "Party Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Billing State",
			dataIndex: "billing_state",
			key: "billing_state",
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
									editMasterList(
										masterName,
										{ ...data, update_delivery: false, status: 2 },
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
										update_delivery: false,
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
								handleMasterEdit({
									...data,
									update_delivery: false,
									reject_reason: null,
									status: 1,
								}),
						},
						{
							label: "Delete",
							onClick: () =>
								dispatch(
									editMasterList(
										masterName,
										{ ...data, update_delivery: false, is_active: false },
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
				modalName={partyModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={partyList}
				columns={columns}
				rowKey={partyList => partyList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{partyList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<PartyModal />
		</>
	);
};

export default Party;
