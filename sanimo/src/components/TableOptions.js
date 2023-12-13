import { useDispatch } from "react-redux";

import { exportMasterList } from "actions/master";
import { openModal } from "actions/modal";
import { importModalName } from "components/masters/import/ImportModal";

const TableOptions = ({
	masterName,
	modalName,
	status,
	showAdd = true,
	showImport = true,
	showExport = true,
}) => {
	const dispatch = useDispatch();

	const handleImportMaster = () =>
		dispatch(openModal(importModalName, { masterName, status }));

	const handleExportMaster = () =>
		dispatch(exportMasterList(masterName, status));

	const handleAddMaster = () => {
		dispatch(openModal(modalName));
	};

	return (
		<div className="d-flex flex-row justify-content-between p-3">
			<h2 style={{ textTransform: "capitalize" }}>{masterName} List</h2>
			<div className="flex-grow-1"></div>
			<>
				{showAdd && (
					<button
						className="btn ms-3 align-self-center fs-7 fw-500 bg-color-orange color-white table-btn"
						style={{
							borderRadius: 10,
						}}
						type="button"
						onClick={handleAddMaster}
					>
						Add{" "}
						<span style={{ textTransform: "capitalize" }}>{masterName}</span>
					</button>
				)}
				{showImport && (
					<button
						className="btn ms-3 align-self-center fs-7 fw-500 bg-color-orange color-white table-btn"
						style={{ borderRadius: 10 }}
						type="button"
						onClick={handleImportMaster}
					>
						Import
					</button>
				)}
				{showExport && (
					<button
						className="btn ms-3 align-self-center fs-7 fw-500 bg-color-orange color-white table-btn"
						style={{ borderRadius: 10 }}
						type="button"
						onClick={handleExportMaster}
					>
						Export To Excel
					</button>
				)}
			</>
		</div>
	);
};

export default TableOptions;
