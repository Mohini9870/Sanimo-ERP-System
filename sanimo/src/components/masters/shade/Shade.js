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
	getShadeMasterList,
	getShadePagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { masterName, shadeModalName } from "./shadeConstants";
import ShadeModal from "./ShadeModal";

const Shade = () => {
	const { status } = useParams();
	const dispatch = useDispatch();

	const shadeList = useSelector(getShadeMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getShadePagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getShadeData = useCallback(
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
		useMasterLogic(getShadeData, shadeModalName);

	const columns = [
		{
			title: "Shade Number",
			dataIndex: "shade_no",
			key: "shade_no",
		},
		{
			title: "Quality Name",
			dataIndex: "yarn_quality",
			key: "yarn_quality",
			width: "50%",
			render: yarnQuality => {
				return (
					<span>
						{yarnQuality.map((yq, i) =>
							yarnQuality.length - 1 === i ? `${yq.name}` : `${yq.name}, `
						)}
					</span>
				);
			},
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
											yarn_quality: data?.yarn_quality?.map(yq => yq?.id),
											update_yarn_quality: false,
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
										yarn_quality: data?.yarn_quality?.map(yq => yq?.id),
										update_yarn_quality: false,
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
											yarn_quality: data?.yarn_quality?.map(yq => yq?.id),
											is_active: false,
											update_yarn_quality: false,
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
				modalName={shadeModalName}
				status={status}
			/>
			<StatusSegments masterName={masterName} />
			<Table
				dataSource={shadeList}
				columns={columns}
				rowKey={shadeList => shadeList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{shadeList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<ShadeModal />
		</>
	);
};

export default Shade;
