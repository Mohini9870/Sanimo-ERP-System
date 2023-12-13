import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { useEffect, useMemo, useState } from "react";
import { MdArrowDropDown, MdEdit, MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { getMasterList } from "actions/master";
import { openModal } from "actions/modal";
import { selectCompany, userLogout } from "actions/user";
import { companyModalName } from "components/masters/company/companyConstants";
import CompanyModal from "components/masters/company/CompanyModal";
import ImportModal from "components/masters/import/ImportModal";
import RejectModal from "components/masters/rejectModal/RejectModal";
import { getCompanyMasterList } from "reducers/master";
import { getUserDetails } from "reducers/user";

import AuthorizedRoutes, { sidebarItemsList } from "./AuthorizedRoutes";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [collapsed, setCollapsed] = useState(true);

	useEffect(() => {
		dispatch(getMasterList("company"));
	}, [dispatch]);

	const { isLoggedIn, token, selectedCompanyId } = useSelector(getUserDetails);
	const companyList = useSelector(getCompanyMasterList);
	const selectedCompany = companyList.find(c => c?.id === selectedCompanyId);

	const items = useMemo(
		() => [
			...companyList?.map((company, index) => {
				return {
					label: (
						<>
							<Button
								onClick={() => {
									if (company?.id !== selectedCompany?.id)
										dispatch(selectCompany(company?.id));
								}}
								type="link"
								className="fs-6 p-0 fw-500 w-100"
								style={{
									height: 40,
									color: company.id !== selectedCompany?.id && "grey",
								}}
							>
								{company?.name}
							</Button>
							{companyList?.length - 1 !== index && <hr className="m-0" />}
						</>
					),
					value: company?.id,
				};
			}),
			{
				label: (
					<>
						<Button
							onClick={() =>
								dispatch(openModal(companyModalName, selectedCompany))
							}
							className="p-0 bg-primary color-white d-flex justify-content-center align-items-center w-100 fw-500 fs-6"
							style={{
								height: 40,
							}}
						>
							<MdEdit className="me-1 fs-6" />
							Edit
						</Button>
					</>
				),
				value: "Edit",
			},
		],
		[companyList, selectedCompany, dispatch]
	);

	if (!(isLoggedIn && token)) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			<Layout>
				<Sider
					style={{ minHeight: "100vh" }}
					trigger={null}
					collapsible
					collapsed={collapsed}
				>
					<div className="d-flex justify-content-center p-2">
						<img
							src={collapsed ? "/images/sanimo-logo.PNG" : "/images/sanimo.PNG"}
							alt="logo"
							style={{ width: "80%", height: 50 }}
						/>
					</div>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={params["*"]?.split("/")?.[0] || "dashboard"}
						items={sidebarItemsList}
						onClick={value => {
							value?.keyPath?.includes("masters")
								? navigate(`/${value?.key}/2`)
								: navigate(`/${value?.key}`);
						}}
					/>
				</Sider>
				<Layout className="site-layout">
					<Header className="p-0 bg-white">
						<div className="d-flex justify-content-between align-items-center h-100">
							<div>
								{collapsed ? (
									<MenuUnfoldOutlined
										onClick={() => setCollapsed(false)}
										className="justify-content-start fs-4 ms-3"
									/>
								) : (
									<MenuFoldOutlined
										onClick={() => setCollapsed(true)}
										className="justify-content-start fs-4 ms-3"
									/>
								)}
							</div>
							<div className="d-flex align-items-center">
								<Dropdown menu={{ items }} placement="bottom" trigger="click">
									<Button
										className="m-0 p-0 fs-5 d-flex align-items-center"
										type="link"
									>
										{selectedCompany && (
											<img
												src={selectedCompany?.logo}
												alt="companyLogo"
												className="me-2"
												style={{
													height: 25,
													width: 25,
													borderRadius: "50%",
												}}
											/>
										)}
										<span className="color-black fw-500">
											{selectedCompany?.name || "Select Company"}
										</span>
										<MdArrowDropDown className="fs-4 color-black fw-bold" />
									</Button>
								</Dropdown>
								<Button
									className="d-flex align-items-center color-black ms-5 me-3 logout-btn"
									onClick={() => dispatch(userLogout())}
									type="link"
								>
									<MdOutlineLogout className="justify-content-end fs-3" />
								</Button>
							</div>
						</div>
					</Header>
					<Content className="m-3 p-3 bg-white">
						<AuthorizedRoutes />
					</Content>
				</Layout>
			</Layout>
			<CompanyModal />
			<ImportModal />
			<RejectModal />
		</>
	);
};
export default Navbar;
