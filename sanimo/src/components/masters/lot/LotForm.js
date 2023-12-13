import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";

import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "reducers/master";
import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

const formName = "lot";

const LotForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

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
							maxLength={25}
							label="Lot Number"
							name="lot_no"
							placeholder="Enter Lot Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormAsyncSelect}
							name="yarn_quality_id"
							label="Quality Name"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.yarn_quality_id?.touched}
							error={errors?.yarn_quality_id}
							placeholder="Quality Name"
							masterDropdownName="yarn-quality"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormAsyncSelect}
							name="supplier_id"
							label="Supplier Name"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.supplier_id?.touched}
							error={errors?.supplier_id}
							placeholder="Supplier Name"
							masterDropdownName="party"
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
	fields: ["lot_no", "yarn_quality_id", "supplier_id"],
	validate: values => {
		const errors = {};
		if (!values?.lot_no || values?.lot_no?.length === 0) {
			errors.lot_no = "Required";
		}
		if (!values?.yarn_quality_id || values?.yarn_quality_id?.length === 0) {
			errors.yarn_quality_id = "Required";
		}
		if (!values?.supplier_id || values?.supplier_id?.length === 0) {
			errors.supplier_id = "Required";
		}
		return errors;
	},
})(LotForm);
