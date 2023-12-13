import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { userLogin } from "actions/user";
import { getUserDetails } from "reducers/user";

import LoginForm from "./LoginForm";

const LoginPage = () => {
	const dispatch = useDispatch();

	const user = useSelector(getUserDetails);

	const handleSubmit = formData => {
		dispatch(userLogin(formData));
	};

	if (user?.isLoggedIn && user?.token) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="login-page-bg vh-100">
			<div
				className="d-flex justify-content-center align-items-center"
				style={{
					height: "60vh",
				}}
			>
				<Card>
					<div className="p-3">
						<img
							src="/images/sanimo.PNG"
							alt="Sanimo"
							style={{ height: 50 }}
						></img>
						<LoginForm onSubmit={handleSubmit} />
					</div>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
