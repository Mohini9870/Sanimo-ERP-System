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

import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";

import { useEffect } from "react";
import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "reducers/master";
import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";
import { renderModalButtons } from "utils/renderModalButtons";
import {
	gradeOptions,
	grnTypeOptions,
	returnableTypeOptions,
	typeOfPackagingOptions,
	uomOptions,
} from "./grnConstants";
import { renderShadeEntry } from "./renderShadeEntry";

const formName = "grn";
const formSelector = formValueSelector(formName);

const GrnForm = ({
	title,
	onCancel,
	handleSubmit,
	isViewOnly,
	initialValues,
}) => {
	const dispatch = useDispatch();

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);

	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));
	const shadeEntry = useSelector(state => formSelector(state, "shade_entry"));
	const updateShadeEntry = useSelector(state =>
		formSelector(state, "update_shade_entry")
	);
	const returnableType = useSelector(state =>
		formSelector(state, "returnable_type")
	);
	const typeOfPacking = useSelector(state =>
		formSelector(state, "type_of_packing")
	);

	const updateAmount = (index, noOfCheese, rate) => {
		dispatch(
			change(
				formName,
				`shade_entry.[${index}].amount`,
				Math.round(+rate * (+noOfCheese ? +noOfCheese : 1) * 100) / 100 || 0
			)
		);
	};

	const updateAvgWeight = (index, noOfCheese, netWeight) => {
		dispatch(
			change(
				formName,
				`shade_entry.[${index}].average_weight`,
				Math.round((+netWeight / (+noOfCheese ? +noOfCheese : 1)) * 100) /
					100 || 0
			)
		);
	};

	useEffect(() => {
		let totalQuantity = shadeEntry.reduce((acc, shadeEnt) => {
			return acc + (+shadeEnt?.no_of_cheese || 0);
		}, 0);
		dispatch(change(formName, "total_quantity", totalQuantity));

		let totalAmount = shadeEntry.reduce((acc, shadeEnt) => {
			return acc + (+shadeEnt?.amount || 0);
		}, 0);
		dispatch(change(formName, "total_amount", totalAmount));
	}, [shadeEntry, dispatch]);

	useEffect(() => {
		if (meta?.shade_entry && updateShadeEntry === false)
			dispatch(change(formName, "update_shade_entry", true));
	}, [meta?.shade_entry, updateShadeEntry, dispatch]);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					{initialValues?.id && (
						<Col className="mb-3">
							<Field
								component={ReduxFormTextField}
								maxLength={55}
								label="GRN Number"
								name="grn_no"
								placeholder="Enter GRN Number"
								disabled
							/>
						</Col>
					)}
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="GRN Date"
							name="grn_date"
							type="date"
							placeholder="Enter GRN Date"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="grn_type"
							label="GRN Type"
							options={grnTypeOptions}
							disabled={isViewOnly}
							touched={meta?.grn_type?.touched}
							error={errors?.grn_type}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormAsyncSelect}
							name="transport_id"
							label="Transporter"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.transport_id?.touched}
							error={errors?.transport_id}
							placeholder="Transport"
							masterDropdownName="transport"
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={25}
							label="Vehicle Number"
							name="vehicle_no"
							placeholder="Enter Vehicle Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={40}
							label="Security Inward Number"
							name="security_inward_no"
							placeholder="Enter Security Inward Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Security Inward Date"
							name="security_inward_date"
							placeholder="Enter Security Inward Date"
							disabled={isViewOnly}
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
							masterDropdownName="party"
							placeholder="Supplier Name"
							query={{ party_type: "Vendor" }}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={20}
							label="Challan Number"
							name="challan_no"
							placeholder="Enter Challan Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Challan Date"
							name="challan_date"
							placeholder="Enter Challan Date"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Invoice Number"
							name="invoice_no"
							placeholder="Enter Invoice Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Invoice Date"
							name="invoice_date"
							placeholder="Enter Invoice Date"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Lot Number"
							name="lot_no"
							placeholder="Enter Lot Number"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-2">
						<Field
							component={ReduxFormAsyncSelect}
							name="base_manufacturer_id"
							label="Base Manufacturer"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.base_manufacturer?.touched}
							error={errors?.base_manufacturer}
							masterDropdownName="party"
							placeholder="Base Manufacturer"
							// query={{ party_type: "Vendor" }}
						/>
					</Col>
					<Col className="mb-2">
						<Field
							component={ReduxFormAsyncSelect}
							name={`process_id`}
							label="Process Name"
							disabled={isFetchingDropdown || isViewOnly}
							touched={meta?.process_id?.touched}
							error={errors?.process_id}
							placeholder="Process Name"
							masterDropdownName="process"
						/>
					</Col>
					<Col className="mb-2">
						<Field
							component={ReduxFormSelectField}
							name={`uom`}
							label="UOM"
							disabled={isFetchingDropdown || isViewOnly}
							options={uomOptions}
							touched={meta?.uom?.touched}
							error={errors?.uom}
							placeholder="Select UOM"
						/>
					</Col>
					<Col className="mb-2">
						<Field
							component={ReduxFormSelectField}
							name={`returnable_type`}
							label="Returnable"
							disabled={isFetchingDropdown || isViewOnly}
							options={returnableTypeOptions}
							touched={meta?.returnable_type?.touched}
							error={errors?.returnable_type}
							placeholder="Returnable Type"
						/>
					</Col>
					<Col className="mb-2">
						<Field
							component={ReduxFormSelectField}
							name={`type_of_packing`}
							label="Type of Packing"
							disabled={isFetchingDropdown || isViewOnly}
							options={typeOfPackagingOptions}
							touched={meta?.type_of_packing?.touched}
							error={errors?.type_of_packing}
							placeholder="Type of Packing"
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="grade"
							label="Grade"
							options={gradeOptions}
							disabled={isViewOnly}
							touched={meta?.grade?.touched}
							error={errors?.grade}
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
							component={ReduxFormTextField}
							type="number"
							label="Total Quantity"
							name="total_quantity"
							placeholder="Enter Total Quantity"
							disabled
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Total Amount"
							name="total_amount"
							placeholder="Enter Total Amount"
							disabled
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="shade_entry"
						component={renderShadeEntry}
						shadeEntry={shadeEntry}
						isFetchingDropdown={isFetchingDropdown}
						updateAmount={updateAmount}
						updateAvgWeight={updateAvgWeight}
						errorsData={errors}
						metaData={meta}
						isViewOnly={isViewOnly}
						isReturnable={returnableType === "Returnable"}
						typeOfPacking={typeOfPacking}
					/>
				</Row>
			</Modal.Body>
			{renderModalButtons(onCancel, isUpdatingMaster || isViewOnly)}
		</form>
	);
};

export default reduxForm({
	form: formName,
	validate: values => {
		const errors = {};
		if (!values?.grn_type || values?.grn_type?.length === 0) {
			errors.grn_type = "Required";
		}
		if (!values?.supplier_id || values?.supplier_id?.length === 0) {
			errors.supplier_id = "Required";
		}
		if (!values?.lot_no || values?.lot_no?.length === 0) {
			errors.lot_no = "Required";
		}
		if (!values?.grade || values?.grade?.length === 0) {
			errors.grade = "Required";
		}
		if (!values?.yarn_quality_id || values?.yarn_quality_id?.length === 0) {
			errors.yarn_quality_id = "Required";
		}
		if (!values.process_id || values?.process_id?.length === 0) {
			errors.process_id = "Required";
		}
		if (!values.uom || values?.uom?.length === 0) {
			errors.uom = "Required";
		}
		if (!values.returnable_type || values?.returnable_type?.length === 0) {
			errors.returnable_type = "Required";
		}
		if (!values.type_of_packing || values?.type_of_packing?.length === 0) {
			errors.type_of_packing = "Required";
		}

		if (!values?.shade_entry || values?.shade_entry?.length === 0) {
			errors.shade_entry = { _error: "Atleast one shade entry is required" };
		} else {
			const shadeErrors = [];
			values?.shade_entry?.forEach((shadeEntry, targetIndex) => {
				const shadeEntryError = {};
				if (!shadeEntry.shade_no || shadeEntry?.shade_no?.length === 0) {
					shadeEntryError.shade_no = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (
					!shadeEntry.no_of_chesse ||
					shadeEntry?.no_of_chesse?.length === 0
				) {
					shadeEntryError.no_of_chesse = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (
					!shadeEntry.no_of_cartons ||
					shadeEntry?.no_of_cartons?.length === 0
				) {
					shadeEntryError.no_of_cartons = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (!shadeEntry.net_weight || shadeEntry?.net_weight?.length === 0) {
					shadeEntryError.net_weight = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (
					!shadeEntry.gross_weight ||
					shadeEntry?.gross_weight?.length === 0
				) {
					shadeEntryError.gross_weight = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (shadeEntry?.no_of_cartons && shadeEntry?.no_of_cartons % 1 !== 0) {
					shadeEntryError.no_of_cartons =
						"Number of Carton/Pallet should be integer";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (
					!shadeEntry.no_of_cheese ||
					shadeEntry?.no_of_cheese?.length === 0
				) {
					shadeEntryError.no_of_cheese = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (!shadeEntry.rate || shadeEntry?.rate?.length === 0) {
					shadeEntryError.rate = "Required";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (shadeEntry?.no_of_chesse && shadeEntry?.no_of_chesse % 1 !== 0) {
					shadeEntryError.no_of_chesse = "Number of Cheese should be integer";
					shadeErrors[targetIndex] = shadeEntryError;
				}
				if (
					shadeEntry?.returnable_item_rate &&
					((shadeEntry?.returnable_item_rate * 100) % 1 !== 0 ||
						shadeEntry?.returnable_item_rate?.length > 16)
				) {
					shadeEntryError.returnable_item_rate =
						"Enter a valid returnable item rate";
					shadeErrors[targetIndex] = shadeEntryError;
				}

				if (
					shadeEntry?.gross_weight &&
					((shadeEntry?.gross_weight * 100) % 1 !== 0 ||
						shadeEntry?.gross_weight?.length > 16)
				) {
					shadeEntryError.gross_weight = "Enter a valid gross weight";
					shadeErrors[targetIndex] = shadeEntryError;
				}

				if (
					shadeEntry?.tare_weight &&
					((shadeEntry?.tare_weight * 100) % 1 !== 0 ||
						shadeEntry?.tare_weight?.length > 16)
				) {
					shadeEntryError.tare_weight = "Enter a valid tare weight";
					shadeErrors[targetIndex] = shadeEntryError;
				}

				if (
					shadeEntry?.net_weight &&
					((shadeEntry?.net_weight * 100) % 1 !== 0 ||
						shadeEntry?.net_weight?.length > 16)
				) {
					shadeEntryError.net_weight = "Enter a valid net weight";
					shadeErrors[targetIndex] = shadeEntryError;
				}

				if (
					shadeEntry?.weight &&
					((shadeEntry?.weight * 100) % 1 !== 0 ||
						shadeEntry?.weight?.length > 16)
				) {
					shadeEntryError.weight = "Enter a valid weight";
					shadeErrors[targetIndex] = shadeEntryError;
				}

				if (
					shadeEntry?.rate &&
					((shadeEntry?.rate * 100) % 1 !== 0 || shadeEntry?.rate?.length > 16)
				) {
					shadeEntryError.rate = "Enter a valid rate";
					shadeErrors[targetIndex] = shadeEntryError;
				}
			});
			if (shadeErrors.length) {
				errors.shade_entry = shadeErrors;
			}
		}

		return errors;
	},
})(GrnForm);
