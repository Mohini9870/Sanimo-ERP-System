import { Button, Dropdown } from "antd";
import { MdArrowDropDown } from "react-icons/md";

export const renderActions = items => {
	if (items?.length > 1) {
		return (
			<Dropdown
				menu={{
					items: items.map(item => ({
						label: (
							<Button
								className="d-flex justify-content-center align-items-center p-0 fs-6 w-100"
								type="link"
								onClick={() => item.onClick()}
							>
								{item.label}
							</Button>
						),
					})),
				}}
				placement="bottom"
				trigger="click"
			>
				<Button className="m-0 p-0 fs-6" type="link">
					Actions
					<MdArrowDropDown className="fs-5 mb-1" />
				</Button>
			</Dropdown>
		);
	} else if (items?.length === 1) {
		return (
			<Button
				className="d-flex justify-content-start align-items-center p-0 fs-6 w-100"
				type="link"
				onClick={() => items?.[0]?.onClick()}
			>
				{items?.[0]?.label}
			</Button>
		);
	} else {
		return null;
	}
};
