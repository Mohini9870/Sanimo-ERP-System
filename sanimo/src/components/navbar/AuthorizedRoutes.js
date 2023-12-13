import { CgOrganisation } from "react-icons/cg";
import { MdRawOn, MdSpaceDashboard } from "react-icons/md";
import { Route, Routes } from "react-router-dom";

import Dashboard from "components/dashboard/Dashboard";
import Count from "components/masters/count/Count";
import Denier from "components/masters/denier/Denier";
import Department from "components/masters/department/Department";
import Filament from "components/masters/filament/Filament";
import Lot from "components/masters/lot/Lot";
import Party from "components/masters/party/Party";
import Process from "components/masters/process/Process";
import Shade from "components/masters/shade/Shade";
import Transport from "components/masters/transport/Transport";
import YarnQuality from "components/masters/yarnQuality/YarnQuality";
import Grn from "components/rawMaterial/Grn/Grn";
import Repacking from "components/rawMaterial/Repacking/Repacking";
import Stock from "components/rawMaterial/Stock/Stock";

const getItem = (label, key, icon, children, onClick) => {
	return {
		key,
		icon,
		children,
		label,
		onClick,
	};
};

export const sidebarItemsList = [
	getItem("Dashboard", "dashboard", <MdSpaceDashboard className="fs-4" />),
	getItem("Masters", "masters", <CgOrganisation className="fs-4" />, [
		getItem("Party", "party"),
		getItem("Transport", "transport"),
		getItem("Department", "department"),
		getItem("Process", "process"),
		getItem("Denier", "denier"),
		getItem("Filament", "filament"),
		getItem("Count", "count"),
		getItem("Shade", "shade"),
		getItem("Lot", "lot"),
		getItem("Yarn Quality", "yarn-quality"),
	]),
	getItem("Raw Material", "raw-material", <MdRawOn className="fs-4" />, [
		getItem("GRN", "raw-material/grn"),
		// getItem("Repacking", "raw-material/repacking"),
		getItem("Stock", "raw-material/stock/carton"),
	]),
];

const AuthorizedRoutes = () => {
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} exact />
			<Route path="/party/:status" element={<Party />} exact />
			<Route path="/transport/:status" element={<Transport />} exact />
			<Route path="/department/:status" element={<Department />} exact />
			<Route path="/process/:status" element={<Process />} exact />
			<Route path="/denier/:status" element={<Denier />} exact />
			<Route path="/filament/:status" element={<Filament />} exact />
			<Route path="/shade/:status" element={<Shade />} exact />
			<Route path="/count/:status" element={<Count />} exact />
			<Route path="/lot/:status" element={<Lot />} exact />
			<Route path="/yarn-quality/:status" element={<YarnQuality />} exact />
			<Route path="/raw-material/grn" element={<Grn />} exact />
			<Route path="/raw-material/repacking" element={<Repacking />} exact />
			<Route path="/raw-material/stock/:status" element={<Stock />} exact />
		</Routes>
	);
};

export default AuthorizedRoutes;
