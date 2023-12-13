import { Segmented } from "antd";
import { useNavigate } from "react-router-dom";

const StatusSegments = ({ masterName }) => {
	const navigate = useNavigate();

	return (
		<div className="d-flex justify-content-center">
			<Segmented
				className="mt-3 mb-4 fs-6"
				options={[
					{ label: "Approved", value: 2 },
					{ label: "Rejected", value: 3 },
					{ label: "Pending", value: 1 },
				]}
				onChange={val => navigate(`/${masterName}/${val}`)}
			/>
		</div>
	);
};

export default StatusSegments;
