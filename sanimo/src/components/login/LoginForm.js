import { Field, reduxForm } from "redux-form";

import { ReduxFormTextField } from "utils/ReduxFormTextField";

const LoginForm = ({ handleSubmit }) => {
	return (
		<form className="d-flex flex-column p-4" onSubmit={handleSubmit}>
			<div className="mb-3">
				<Field
					component={ReduxFormTextField}
					label="User Name"
					name="username"
					className="form-control"
					type="text"
					placeholder="Enter username"
				/>
			</div>

			<div className="mb-3">
				<Field
					component={ReduxFormTextField}
					label="Password"
					name="password"
					className="form-control"
					type="password"
					placeholder="Enter Password"
				/>
			</div>

			<button
				className="btn btn-outline-primary mt-2"
				style={{ borderRadius: "25px" }}
				type="submit"
			>
				Submit
			</button>
		</form>
	);
};

export default reduxForm({
	form: "login",
	validate: values => {
		const errors = {};
		if (!values?.username || values?.username?.length === 0) {
			errors.username = "Required";
		}
		if (!values?.password || values?.password?.length === 0) {
			errors.password = "Required";
		}
		return errors;
	},
})(LoginForm);
