import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";

import { getIsImportingMaster } from "reducers/master";
import { ReduxFormFileField } from "utils/ReduxFormFileField";
import { renderModalButtons } from "utils/renderModalButtons";

const formName = "import";
const ImportForm = ({ title, onCancel, handleSubmit }) => {
	const isImportingMaster = useSelector(getIsImportingMaster);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>
					<span style={{ textTransform: "capitalize" }}>{title}</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col>
						<Field name="file" type="file" component={ReduxFormFileField} />
						{meta?.file?.touched && errors?.file && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.file}
							</span>
						)}
					</Col>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isImportingMaster)}
		</form>
	);
};

export default reduxForm({
	form: formName,
	validate: values => {
		const errors = {};
		if (!values?.file || values?.file?.length === 0) {
			errors.file = "Required";
		}
		return errors;
	},
})(ImportForm);
