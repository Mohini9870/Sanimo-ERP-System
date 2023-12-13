import { Table } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMasterList } from "actions/master";
import CustomPagination from "components/CustomPagination";
import TableOptions from "components/TableOptions";
import useMasterLogic from "customHooks/useMasterLogic";
import {
	getIsFetchingMasterList,
	getRepackingMasterList,
	getRepackingPagination,
} from "reducers/master";
import { renderActions } from "utils/renderActions";
import { repackingModalName, tableName } from "./repackingConstants";
import RepackingModal from "./RepackingModal";

const Repacking = () => {
	const dispatch = useDispatch();

	const repackingList = useSelector(getRepackingMasterList);
	const { pageSize, totalElements, currentPage } = useSelector(
		getRepackingPagination
	);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getRepackingData = useCallback(
		(pageNum = 1, itemsPerPage = 10) => {
			dispatch(
				getMasterList(tableName, {
					page: pageNum,
					page_size: itemsPerPage,
				})
			);
		},
		[dispatch]
	);

	const { handleMasterEdit, handlePageChange, handleViewMaster } =
		useMasterLogic(getRepackingData, repackingModalName);

	const columns = [
		{
			title: "GRN Number",
			dataIndex: "grn_no",
			key: "grn_no",
		},
		{
			title: "GRN Type",
			dataIndex: "grn_type",
			key: "grn_type",
		},
		{
			title: "Supplier Name",
			dataIndex: ["supplier", "name"],
			key: "supplier",
		},
		{
			title: "Lot Number",
			dataIndex: "lot_no",
			key: "lot_no",
		},
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
		},
		{
			title: "Quality Name",
			dataIndex: ["yarn_quality", "name"],
			key: "yarn_quality",
		},
		{
			title: "Total Quantity",
			dataIndex: "total_quantity",
			key: "total_quantity",
		},
		{
			title: "Total Amount",
			dataIndex: "total_amount",
			key: "total_amount",
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
					{
						label: "Edit",
						onClick: () => handleMasterEdit(data),
					},
				];

				return renderActions(items);
			},
		},
	];

	return (
		<>
			<TableOptions
				masterName={tableName}
				modalName={repackingModalName}
				showImport={false}
			/>
			<Table
				dataSource={repackingList}
				columns={columns}
				rowKey={repackingList => repackingList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{repackingList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<RepackingModal />
		</>
	);
};

export default Repacking;
