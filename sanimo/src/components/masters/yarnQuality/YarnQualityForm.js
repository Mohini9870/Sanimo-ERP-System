import { useEffect, useMemo } from "react";
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

import {
	getIsFetchingDropdownList,
	getIsFetchingMasterList,
	getIsUpdatingMasterList,
} from "reducers/master";
import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";
import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { renderModalButtons } from "utils/renderModalButtons";

import { renderPartyShadeReference } from "./renderPartyShadeReference";
import { renderQualityDeveloped } from "./renderQualityDeveloped";
import {
	baseDirectionOptions,
	categoryOptions,
	dyeTypeOptions,
	lusterOptions,
	processOptions,
	tdOptions,
	twistTypeOptions,
	uomOptions,
	yarnTypeOptions,
} from "./yarnQualityConstants";

const formName = "yarn-quality";
const formSelector = formValueSelector(formName);

const YarnQualityForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingMasterList = useSelector(getIsFetchingMasterList);

	const qualityDeveloped = useSelector(state =>
		formSelector(state, "quality_developed")
	);
	const partyShadeReference = useSelector(state =>
		formSelector(state, "party_shade_reference")
	);

	const denier = useSelector(state => formSelector(state, "denier_id"));
	const filament = useSelector(state => formSelector(state, "filament_id"));
	const yarnType = useSelector(state => formSelector(state, "yarn_type"));
	const category = useSelector(state => formSelector(state, "category"));
	const luster = useSelector(state => formSelector(state, "luster"));
	const process = useSelector(state => formSelector(state, "process"));
	const dyeType = useSelector(state => formSelector(state, "dye_type"));
	const twistType = useSelector(state => formSelector(state, "twist_type"));
	const basePly = useSelector(state => formSelector(state, "base_ply"));
	const baseDirection = useSelector(state =>
		formSelector(state, "base_direction")
	);
	const primaryTpm = useSelector(state => formSelector(state, "primary_tpm"));
	const primaryTd = useSelector(state => formSelector(state, "primary_td"));
	const twistPly = useSelector(state => formSelector(state, "twist_ply"));
	const secondaryTpm = useSelector(state =>
		formSelector(state, "secondary_tpm")
	);
	const secondaryTd = useSelector(state => formSelector(state, "secondary_td"));
	const multiTpm = useSelector(state => formSelector(state, "multi_tpm"));
	const multiTd = useSelector(state => formSelector(state, "multi_td"));
	const multiPly = useSelector(state => formSelector(state, "multi_ply"));

	const technicalDescription = useMemo(
		() =>
			`${category ? category + "/" : ""}${luster ? luster + "/" : ""}${
				process ? process + "/" : ""
			}${dyeType ? dyeType + "/" : ""}${twistType ? twistType + "/" : ""}${
				denier ? denier?.label + "/" : ""
			}${filament ? filament?.label + "/" : ""}${basePly ? basePly + "/" : ""}${
				baseDirection ? baseDirection + "/" : ""
			}${primaryTpm ? primaryTpm + "/" : ""}${
				primaryTd ? primaryTd + "/" : ""
			}${twistPly ? twistPly + "/" : ""}${
				secondaryTpm ? secondaryTpm + "/" : ""
			}${secondaryTd ? secondaryTd + "/" : ""}${
				multiTpm ? multiTpm + "/" : ""
			}${multiTd ? multiTd + "/" : ""}${multiPly ? multiPly + "/" : ""}`,
		[
			category,
			luster,
			process,
			dyeType,
			twistType,
			denier,
			filament,
			basePly,
			baseDirection,
			primaryTpm,
			primaryTd,
			twistPly,
			secondaryTpm,
			secondaryTd,
			multiTpm,
			multiTd,
			multiPly,
		]
	);

	useEffect(() => {
		dispatch(
			change(
				formName,
				"technical_description",
				technicalDescription
					? technicalDescription?.substring(0, technicalDescription.length - 1)
					: ""
			)
		);
	}, [technicalDescription, dispatch]);

	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

	useEffect(() => {
		if (meta?.delivery && qualityDeveloped === false)
			dispatch(change(formName, "quality_developed", true));
	}, [meta?.delivery, qualityDeveloped, dispatch]);

	useEffect(() => {
		if (meta?.delivery && partyShadeReference === false)
			dispatch(change(formName, "party_shade_reference", true));
	}, [meta?.delivery, partyShadeReference, dispatch]);

	const updateQualityDeveloped = useSelector(state =>
		formSelector(state, "update_quality_developed")
	);

	useEffect(() => {
		if (meta?.quality_developed && updateQualityDeveloped === false)
			dispatch(change(formName, "update_quality_developed", true));
	}, [meta?.quality_developed, updateQualityDeveloped, dispatch]);

	const updatePartyShadeReference = useSelector(state =>
		formSelector(state, "update_party_shade_reference")
	);

	useEffect(() => {
		if (meta?.party_shade_reference && updatePartyShadeReference === false)
			dispatch(change(formName, "update_party_shade_reference", true));
	}, [meta?.party_shade_reference, updatePartyShadeReference, dispatch]);

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
							name="yarn_type"
							label="Yarn Type"
							options={yarnTypeOptions}
							touched={meta?.yarn_type?.touched}
							error={errors?.yarn_type}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={20}
							label="Yarn Code"
							name="yarn_code"
							placeholder="Enter Yarn Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="category"
							label="Category"
							options={categoryOptions}
							touched={meta?.category?.touched}
							error={errors?.category}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="luster"
							label="Luster"
							options={lusterOptions}
							touched={meta?.luster?.touched}
							error={errors?.luster}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="process"
							label="Process"
							options={processOptions}
							touched={meta?.process?.touched}
							error={errors?.process}
							disabled={isViewOnly || isFetchingMasterList}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="dye_type"
							label="Dyed/Non-Dyed"
							options={dyeTypeOptions}
							touched={meta?.dye_type?.touched}
							error={errors?.dye_type}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="twist_type"
							label="Twist Type"
							options={twistTypeOptions}
							touched={meta?.twist_type?.touched}
							error={errors?.twist_type}
							disabled={isViewOnly}
						/>
					</Col>
					{yarnType === "Count" && (
						<Col className="mb-3">
							<Field
								component={ReduxFormAsyncSelect}
								name="count_id"
								label="Count"
								touched={meta?.count_id?.touched}
								error={errors?.count_id}
								disabled={isViewOnly || isFetchingMasterList}
								masterDropdownName="count"
								placeholder="Count"
								isClearable
							/>
						</Col>
					)}
					{yarnType === "Denier-Filament" && (
						<>
							<Col className="mb-3">
								<Field
									component={ReduxFormAsyncSelect}
									name="denier_id"
									label="Denier"
									touched={meta?.denier_id?.touched}
									error={errors?.denier_id}
									disabled={isViewOnly || isFetchingMasterList}
									masterDropdownName="denier"
									placeholder="Denier"
									isClearable
								/>
							</Col>
							<Col className="mb-3">
								<Field
									component={ReduxFormAsyncSelect}
									name="filament_id"
									label="Filament"
									touched={meta?.filament_id?.touched}
									error={errors?.filament_id}
									disabled={isViewOnly || isFetchingMasterList}
									placeholder="Filament"
									masterDropdownName="filament"
									isClearable
								/>
							</Col>
						</>
					)}
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Base Ply"
							name="base_ply"
							placeholder="Enter Base Ply"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="base_direction"
							label="Base Direction"
							options={baseDirectionOptions}
							touched={meta?.base_direction?.touched}
							error={errors?.base_direction}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Primary TPM"
							name="primary_tpm"
							placeholder="Enter Primary TPM"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="primary_td"
							label="Primary TD"
							options={tdOptions}
							touched={meta?.primary_td?.touched}
							error={errors?.primary_td}
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Secondary TPM"
							name="secondary_tpm"
							placeholder="Enter Secondary TPM"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="secondary_td"
							label="Secondary TD"
							options={tdOptions}
							touched={meta?.secondary_td?.touched}
							error={errors?.secondary_td}
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={50}
							label="Twist Ply"
							name="twist_ply"
							placeholder="Enter Twist Ply"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					{yarnType === "Denier-Filament" && (
						<>
							<Col className="mb-3">
								<Field
									component={ReduxFormTextField}
									maxLength={50}
									label="Multi TPM"
									name="multi_tpm"
									placeholder="Enter Multi TPM"
									disabled={isViewOnly}
								/>
							</Col>
							<Col className="mb-3">
								<Field
									component={ReduxFormSelectField}
									name="multi_td"
									label="Multi TD"
									options={tdOptions}
									touched={meta?.multi_td?.touched}
									error={errors?.multi_td}
									disabled={isViewOnly}
								/>
							</Col>
							<Col className="mb-3">
								<Field
									component={ReduxFormTextField}
									maxLength={50}
									label="Multi Ply"
									name="multi_ply"
									placeholder="Enter Multi Ply"
									disabled={isViewOnly}
								/>
							</Col>
						</>
					)}
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={250}
							label="Technical Description"
							name="technical_description"
							placeholder="Enter Technical Description"
							disabled
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={250}
							label="Display Name"
							name="name"
							placeholder="Enter Display Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							maxLength={15}
							label="HSN Code"
							name="hsn_code"
							placeholder="Enter HSN Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormSelectField}
							name="uom"
							label="UOM"
							options={uomOptions}
							touched={meta?.uom?.touched}
							error={errors?.uom}
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="quality_developed"
						component={renderQualityDeveloped}
						isFetchingDropdown={isFetchingDropdown}
						errors={errors}
						meta={meta}
						isViewOnly={isViewOnly}
					/>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="party_shade_reference"
						component={renderPartyShadeReference}
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
		"yarn_type",
		"yarn_code",
		"category",
		"luster",
		"process",
		"dye_type",
		"twist_type",
		"count_id",
		"denier_id",
		"filament_id",
		"base_ply",
		"base_direction",
		"primary_tpm",
		"primary_td",
		"twist_ply",
		"secondary_tpm",
		"secondary_td",
		"multi_tpm",
		"multi_td",
		"multi_ply",
		"technical_description",
		"name",
		"hsn_code",
		"uom",
		"quality_developed",
		"party_shade_reference",
	],
	validate: values => {
		const errors = {};
		if (!values?.yarn_type || values?.yarn_type?.length === 0) {
			errors.yarn_type = "Required";
		}
		if (!values?.yarn_code || values?.yarn_code?.length === 0) {
			errors.yarn_code = "Required";
		}
		if (!values?.hsn_code || values?.hsn_code?.length === 0) {
			errors.hsn_code = "Required";
		}
		if (!values?.name || values?.name?.length === 0) {
			errors.name = "Required";
		}
		if (!values?.uom || values?.uom?.length === 0) {
			errors.uom = "Required";
		}

		const qualityDevelopedErrors = [];
		values?.quality_developed?.forEach((quality, targetIndex) => {
			const qualityError = {};
			if (!quality.quality_id || quality?.quality_id?.length === 0) {
				qualityError.quality_id = "Required";
				qualityDevelopedErrors[targetIndex] = qualityError;
			}
			if (!quality.uom || quality?.uom?.length === 0) {
				qualityError.uom = "Required";
				qualityDevelopedErrors[targetIndex] = qualityError;
			}
			if (!quality.shade_id || quality?.shade_id?.length === 0) {
				qualityError.shade_id = "Required";
				qualityDevelopedErrors[targetIndex] = qualityError;
			}
			if (!quality.percentage || quality?.percentage?.length === 0) {
				qualityError.percentage = "Required";
				qualityDevelopedErrors[targetIndex] = qualityError;
			}
			// if (quality.percentage && quality?.percentage?.length > 4) {
			// 	qualityError.percentage = "Percentage can be of maximum of 4 digits";
			// 	qualityDevelopedErrors[targetIndex] = qualityError;
			// }
			// if (quality.pincode && quality?.pincode % 1 !== 0) {
			// 	qualityError.pincode = "Pincode should be a valid integer";
			// 	qualityDevelopedErrors[targetIndex] = qualityError;
			// }
		});
		if (qualityDevelopedErrors.length) {
			errors.quality_developed = qualityDevelopedErrors;
		}

		const partyShadeReferenceErrors = [];
		values?.party_shade_reference?.forEach((partyShade, targetIndex) => {
			const referenceError = {};
			if (!partyShade.party_id || partyShade?.party_id?.length === 0) {
				referenceError.party_id = "Required";
				partyShadeReferenceErrors[targetIndex] = referenceError;
			}
			if (
				!partyShade.quality_reference ||
				partyShade?.quality_reference?.length === 0
			) {
				referenceError.quality_reference = "Required";
				partyShadeReferenceErrors[targetIndex] = referenceError;
			}
		});
		if (partyShadeReferenceErrors.length) {
			errors.party_shade_reference = partyShadeReferenceErrors;
		}

		return errors;
	},
})(YarnQualityForm);
