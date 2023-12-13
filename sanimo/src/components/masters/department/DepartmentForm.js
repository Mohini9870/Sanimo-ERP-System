import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { getIsUpdatingMasterList } from "reducers/master";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

const formName = "department";

const DepartmentForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={35}
							label="Department Name"
							name="name"
							placeholder="Enter Department Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={250}
							label="Description"
							name="description"
							placeholder="Enter Description"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isUpdatingMaster || isViewOnly)}
		</form>
	);
};

export default reduxForm({
	form: formName,
	fields: ["name", "description"],
	validate: values => {
		const errors = {};
		if (!values?.name || values?.name?.length === 0) {
			errors.name = "Required";
		}
		return errors;
	},
})(DepartmentForm);
