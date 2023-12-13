import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";

import { getIsUpdatingMasterList } from "reducers/master";
import { renderModalButtons } from "utils/renderModalButtons";

const formName = "reject";
const RejectForm = ({ onCancel, handleSubmit }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const errors = useSelector(getFormSyncErrors(formName));
	const meta = useSelector(getFormMeta(formName));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>
					<span style={{ textTransform: "capitalize" }}>Reject Reason</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col>
						<Field
							component="textarea"
							maxLength={250}
							className="form-control"
							rows="4"
							label="Reject Reason"
							name="reject_reason"
							placeholder="Enter Reject Reason"
						/>
						{meta?.reject_reason?.touched && errors?.reject_reason && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.reject_reason}
							</span>
						)}
					</Col>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isUpdatingMaster)}
		</form>
	);
};

export default reduxForm({
	form: formName,
	validate: values => {
		const errors = {};
		if (!values?.reject_reason || values?.reject_reason?.length === 0) {
			errors.reject_reason = "Required";
		}
		return errors;
	},
})(RejectForm);
