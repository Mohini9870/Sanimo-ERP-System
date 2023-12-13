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
	getYarnQualityMasterList,
	getYarnQualityPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { masterName, yarnQualityModalName } from "./yarnQualityConstants";
import YarnQualityModal from "./YarnQualityModal";

const YarnQuality = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const yarnQualityList = useSelector(getYarnQualityMasterList);
	const { pageSize, totalElements, currentPage } = useSelector(
		getYarnQualityPagination
	);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getYarnQualityData = useCallback(
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
		useMasterLogic(getYarnQualityData, yarnQualityModalName);

	const columns = [
		{
			title: "Yarn Type",
			dataIndex: "yarn_type",
			key: "yarn_type",
			render: value => {
				return <span style={{ textTransform: "capitalize" }}>{value}</span>;
			},
		},
		{
			title: "Yarn Code",
			dataIndex: "yarn_code",
			key: "yarn_code",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Luster",
			dataIndex: "luster",
			key: "luster",
		},
		{
			title: "Process",
			dataIndex: "process",
			key: "process",
		},
		{
			title: "Dye Type",
			dataIndex: "dye_type",
			key: "dye_type",
		},
		{
			title: "Twist Type",
			dataIndex: "twist_type",
			key: "twist_type",
		},
		{
			title: "Technical Description",
			dataIndex: "technical_description",
			key: "technical_description",
		},
		{
			title: "Display Name",
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
									editMasterList(
										masterName,
										{
											...data,
											count_id: data?.count?.id || null,
											denier_id: data?.denier?.id || null,
											filament_id: data?.filament?.id || null,
											quality_developed: data?.quality_developed?.map(qd => {
												return {
													...qd,
													quality_id: qd?.quality?.id,
													shade_id: qd?.shade?.id,
												};
											}),
											party_shade_reference: data?.party_shade_reference?.map(
												psr => {
													return { ...psr, party_id: psr?.party?.id };
												}
											),
											update_quality_developed: false,
											update_party_shade_reference: false,
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
										status: 3,
										masterName,
										currentStatus: status,
										count_id: data?.count?.id || null,
										denier_id: data?.denier?.id || null,
										filament_id: data?.filament?.id || null,
										quality_developed: data?.quality_developed?.map(qd => {
											return {
												...qd,
												quality_id: qd?.quality?.id,
												shade_id: qd?.shade?.id,
											};
										}),
										party_shade_reference: data?.party_shade_reference?.map(
											psr => {
												return { ...psr, party_id: psr?.party?.id };
											}
										),
										update_quality_developed: false,
										update_party_shade_reference: false,
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
										{
											...data,
											count_id: data?.count?.id || null,
											denier_id: data?.denier?.id || null,
											filament_id: data?.filament?.id || null,
											quality_developed: data?.quality_developed?.map(qd => {
												return {
													...qd,
													quality_id: qd?.quality?.id,
													shade_id: qd?.shade?.id,
												};
											}),
											party_shade_reference: data?.party_shade_reference?.map(
												psr => {
													return { ...psr, party_id: psr?.party?.id };
												}
											),
											update_quality_developed: false,
											update_party_shade_reference: false,
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
				modalName={yarnQualityModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={yarnQualityList}
				columns={columns}
				rowKey={yarnQualityList => yarnQualityList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{yarnQualityList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<YarnQualityModal />
		</>
	);
};

export default YarnQuality;
