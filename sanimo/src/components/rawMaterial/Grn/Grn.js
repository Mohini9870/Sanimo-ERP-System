import { Table } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMasterList } from "actions/master";
import CustomPagination from "components/CustomPagination";
import TableOptions from "components/TableOptions";
import useMasterLogic from "customHooks/useMasterLogic";
import {
	getGrnMasterList,
	getGrnPagination,
	getIsFetchingMasterList,
} from "reducers/master";
import { renderActions } from "utils/renderActions";

import { grnModalName, tableName } from "./grnConstants";
import GrnModal from "./GrnModal";

const Grn = () => {
	const dispatch = useDispatch();

	const grnList = useSelector(getGrnMasterList);
	const { pageSize, totalElements, currentPage } =
		useSelector(getGrnPagination);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const getGrnData = useCallback(
		(pageNum = 1, itemsPerPage = 10) => {
			dispatch(
				getMasterList(tableName, {
					page: pageNum,
					page_size: itemsPerPage,
					status: 1,
				})
			);
		},
		[dispatch]
	);

	const { handleMasterEdit, handlePageChange, handleViewMaster } =
		useMasterLogic(getGrnData, grnModalName);

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
				modalName={grnModalName}
				showImport={false}
			/>
			<Table
				dataSource={grnList}
				columns={columns}
				rowKey={grnList => grnList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
			/>
			{grnList?.length ? (
				<CustomPagination
					totalPages={Math.ceil(totalElements / pageSize)}
					itemsPerPage={pageSize}
					totalItems={totalElements}
					currentPage={currentPage}
					handlePageChange={handlePageChange}
				/>
			) : null}
			<GrnModal />
		</>
	);
};

export default Grn;
