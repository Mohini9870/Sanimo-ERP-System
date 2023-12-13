import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { getIsUpdatingMasterList } from "reducers/master";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

const CompanyForm = ({ title, onCancel, handleSubmit }) => {
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
							maxLength={30}
							label="Name"
							name="name"
							placeholder="Enter Name"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={100}
							label="Address Line 1"
							name="address_1"
							placeholder="Enter Address Line 1"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={100}
							label="Address Line 2"
							name="address_2"
							placeholder="Enter Address Line 2"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="City"
							name="city"
							placeholder="Enter City"
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="State"
							name="state"
							placeholder="Enter State"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={6}
							label="Pincode"
							name="pincode"
							placeholder="Enter Pincode"
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
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={30}
							label="Contact Person"
							name="contact_person"
							placeholder="Enter Contact Person"
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Phone"
							name="phone"
							placeholder="Enter Phone"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={10}
							type="number"
							label="Mobile"
							name="mobile"
							placeholder="Enter Mobile"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={13}
							label="GST Number"
							name="gstin"
							placeholder="Enter GST Number"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={10}
							label="PAN"
							name="pan"
							placeholder="Enter PAN"
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={12}
							label="Fiscal Year Start"
							name="fiscal_year_start"
							placeholder="Enter Fiscal Year Start"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={12}
							label="Fiscal Year End"
							name="fiscal_year_end"
							placeholder="Enter Fiscal Year End"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={20}
							label="Website"
							name="website"
							placeholder="Enter Website"
						/>
					</Col>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isUpdatingMaster)}
		</form>
	);
};

export default reduxForm({
	form: "company",
	fields: [
		"name",
		"address_1",
		"address_2",
		"city",
		"state",
		"pincode",
		"email",
		"contact_person",
		"phone",
		"mobile",
		"gstin",
		"pan",
		"fiscal_year_start",
		"fiscal_year_end",
		"logo",
		"website",
	],
	validate: values => {
		const errors = {};
		if (!values?.name || values?.name?.length === 0) {
			errors.name = "Required";
		}
		if (!values?.address_1 || values?.address_1?.length === 0) {
			errors.address_1 = "Required";
		}
		if (!values?.city || values?.city?.length === 0) {
			errors.city = "Required";
		}
		if (!values?.state || values?.state?.length === 0) {
			errors.state = "Required";
		}
		if (!values?.pincode || values?.pincode?.length === 0) {
			errors.pincode = "Required";
		}
		if (!values?.fiscal_year_start || values?.fiscal_year_start?.length === 0) {
			errors.fiscal_year_start = "Required";
		}
		if (!values?.fiscal_year_end || values?.fiscal_year_end?.length === 0) {
			errors.fiscal_year_end = "Required";
		}
		if (values?.gstin && values?.gstin?.length !== 15) {
			errors.gstin = "GST Number should be of 15 characters";
		}
		if (values?.pan && values?.pan?.length !== 10) {
			errors.pan = "PAN should be of 10 characters";
		}
		if (values?.mobile && values?.mobile?.length > 10) {
			errors.mobile = "Mobile number should be not more than 10 characters";
		}
		return errors;
	},
})(CompanyForm);
