import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	change,
	Field,
	formValueSelector,
	getFormMeta,
	getFormSyncErrors,
	reduxForm,
} from "redux-form";

import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "reducers/master";
import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

const formName = "shade";
const formSelector = formValueSelector(formName);

const ShadeForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));
	const updateYarnQuality = useSelector(state =>
		formSelector(state, "update_yarn_quality")
	);

	useEffect(() => {
		if (meta?.yarn_quality && updateYarnQuality === false)
			dispatch(change(formName, "update_yarn_quality", true));
	}, [meta?.yarn_quality, updateYarnQuality, dispatch]);

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
							label="Shade Number"
							name="shade_no"
							placeholder="Enter Shade Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormAsyncSelect}
							name="yarn_quality"
							label="Quality Name"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.yarn_quality?.touched}
							error={errors?.yarn_quality}
							masterDropdownName="yarn-quality"
							placeholder="Quality Name"
							isMulti
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
	fields: ["shade_no", "yarn_quality"],
	validate: values => {
		const errors = {};
		if (!values?.shade_no || values?.shade_no?.length === 0) {
			errors.shade_no = "Required";
		}
		if (!values?.yarn_quality || values?.yarn_quality?.length === 0) {
			errors.yarn_quality = "Required";
		}
		return errors;
	},
})(ShadeForm);
