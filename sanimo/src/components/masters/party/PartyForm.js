import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	change,
	Field,
	FieldArray,
	formValueSelector,
	getFormMeta,
	getFormSyncErrors,
	reduxForm,
} from "redux-form";

import { stateOptions } from "constants/master";
import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "reducers/master";
import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

import { partyTypeOptions, taxCategoryOptions } from "./partyConstants";
import { renderPartyDelivery } from "./renderPartyDelivery";

const formName = "party";
const formSelector = formValueSelector(formName);

const PartyForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);

	const updateDelivery = useSelector(state =>
		formSelector(state, "update_delivery")
	);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

	useEffect(() => {
		if (meta?.delivery && updateDelivery === false)
			dispatch(change(formName, "update_delivery", true));
	}, [meta?.delivery, updateDelivery, dispatch]);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="party_type"
							label="Party Type"
							options={partyTypeOptions}
							touched={meta?.party_type?.touched}
							error={errors?.party_type}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={55}
							label="Party Name"
							name="name"
							placeholder="Enter Party Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={100}
							label="Billing Address Line 1"
							name="billing_address_1"
							placeholder="Enter Billing Address Line 1"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={100}
							label="Billing Address Line 2"
							name="billing_address_2"
							placeholder="Enter Billing Address Line 2"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Billing City"
							name="billing_city"
							placeholder="Enter Billing City"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="billing_state"
							label="Billing State"
							options={stateOptions}
							disabled={isViewOnly}
							touched={meta?.billing_state?.touched}
							error={errors?.billing_state}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Billing Pincode"
							name="billing_pincode"
							placeholder="Enter Billing Pincode"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							type="email"
							label="Email"
							name="email"
							placeholder="Enter Email"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={30}
							label="Contact Person"
							name="contact_person"
							placeholder="Enter Contact Person"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={15}
							type="number"
							label="Phone"
							name="phone"
							placeholder="Enter Phone"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={10}
							type="number"
							label="Mobile"
							name="mobile"
							placeholder="Enter Mobile"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={13}
							label="GST Number"
							name="gstin"
							placeholder="Enter GST Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={10}
							label="PAN"
							name="pan"
							placeholder="Enter PAN"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="tax_category"
							label="Tax Category"
							options={taxCategoryOptions}
							disabled={isViewOnly}
							touched={meta?.tax_category?.touched}
							error={errors?.tax_category}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Aadhar"
							name="aadhar"
							placeholder="Enter Aadhar"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={55}
							label="Broker Name"
							name="broker_name"
							placeholder="Enter Broker Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Broker Contact"
							name="broker_contact"
							placeholder="Enter Broker Contact"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={10}
							label="Broker PAN"
							name="broker_pan"
							placeholder="Enter Broker PAN"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Broker Aadhar"
							name="broker_aadhar"
							placeholder="Enter Broker Aadhar"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={3}
							label="Broker Percentage"
							name="broker_percentage"
							placeholder="Enter Broker Percentage"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="delivery"
						component={renderPartyDelivery}
						isFetchingDropdown={isFetchingDropdown}
						errors={errors}
						meta={meta}
						isViewOnly={isViewOnly}
					/>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isUpdatingMaster || isViewOnly)}
		</form>
	);
};

export default reduxForm({
	form: formName,
	fields: [
		"party_type",
		"name",
		"billing_address_1",
		"billing_address_2",
		"billing_city",
		"billing_state",
		"billing_pincode",
		"email",
		"contact_person",
		"phone",
		"mobile",
		"gstin",
		"pan",
		"aadhar",
		"broker_name",
		"broker_contact",
		"broker_pan",
		"broker_aadhar",
		"broker_percentage",
	],
	validate: values => {
		const errors = {};
		if (!values?.party_type || values?.party_type?.length === 0) {
			errors.party_type = "Required";
		}
		if (!values?.name || values?.name?.length === 0) {
			errors.name = "Required";
		}
		if (!values?.billing_address_1 || values?.billing_address_1?.length === 0) {
			errors.billing_address_1 = "Required";
		}
		if (!values?.billing_city || values?.billing_city?.length === 0) {
			errors.billing_city = "Required";
		}
		if (!values?.billing_state || values?.billing_state?.length === 0) {
			errors.billing_state = "Required";
		}
		if (!values?.billing_pincode || values?.billing_pincode?.length === 0) {
			errors.billing_pincode = "Required";
		}
		if (values?.billing_pincode && values?.billing_pincode?.length > 6) {
			errors.billing_pincode = "Pincode can be of maximum of 6 digits";
		}
		if (values?.billing_pincode && values?.billing_pincode % 1 !== 0) {
			errors.billing_pincode = "Pincode should be a valid integer";
		}
		if (values?.mobile && values?.mobile?.length > 10) {
			errors.mobile = "Mobile number should be not more than 10 characters";
		}
		if (values?.broker_contact && values?.broker_contact?.length > 10) {
			errors.broker_contact =
				"Contact number should be not more than 10 characters";
		}
		if (values?.gstin && values?.gstin?.length !== 15) {
			errors.gstin = "GST Number should be of 15 characters";
		}
		if (values?.pan && values?.pan?.length !== 10) {
			errors.pan = "PAN should be of 10 characters";
		}
		if (values?.broker_pan && values?.broker_pan?.length !== 10) {
			errors.broker_pan = "PAN should be of 10 characters";
		}
		if (values?.aadhar && values?.aadhar?.length !== 12) {
			errors.aadhar = "Aadhar should be of 12 characters";
		}
		if (values?.broker_aadhar && values?.broker_aadhar?.length !== 12) {
			errors.broker_aadhar = "Aadhar should be of 12 characters";
		}

		const deliveryErrors = [];
		values?.delivery?.forEach((partyDel, targetIndex) => {
			const partyDeliveryError = {};
			if (!partyDel.address_1 || partyDel?.address_1?.length === 0) {
				partyDeliveryError.address_1 = "Required";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
			if (!partyDel.city || partyDel?.city?.length === 0) {
				partyDeliveryError.city = "Required";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
			if (!partyDel.state || partyDel?.state?.length === 0) {
				partyDeliveryError.state = "Required";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
			if (!partyDel.pincode || partyDel?.pincode?.length === 0) {
				partyDeliveryError.pincode = "Required";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
			if (partyDel.pincode && partyDel?.pincode?.length > 6) {
				partyDeliveryError.pincode = "Pincode can be of maximum of 6 digits";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
			if (partyDel.pincode && partyDel?.pincode % 1 !== 0) {
				partyDeliveryError.pincode = "Pincode should be a valid integer";
				deliveryErrors[targetIndex] = partyDeliveryError;
			}
		});
		if (deliveryErrors.length) {
			errors.delivery = deliveryErrors;
		}

		return errors;
	},
})(PartyForm);
