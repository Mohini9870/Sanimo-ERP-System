import { Col, Row } from "react-bootstrap";
import { Field } from "redux-form";

import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";
import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";

import { uomOptions } from "./yarnQualityConstants";

export const renderQualityDeveloped = ({
	fields,
	meta,
	isFetchingDropdown,
	errors,
	isViewOnly,
}) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">Quality Developed</h4>
				{!isViewOnly && (
					<button
						className="me-2 btn btn-primary"
						type="button"
						onClick={() => fields.push({ id: null })}
					>
						Add Quality Developed
					</button>
				)}
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No quality developed added. Click on Add Quality Developed button to
					add one.
				</h6>
			)}
			{fields.map((quality_developed, index) => {
				return (
					<Row key={index} className="mb-3">
						<Col className="mb-3">
							<Field
								component={ReduxFormAsyncSelect}
								name={`${quality_developed}.quality_id`}
								disabled={isFetchingDropdown || isViewOnly}
								touched={meta?.quality_developed?.[index]?.quality_id?.touched}
								error={errors?.quality_developed?.[index]?.quality_id}
								placeholder="Quality Name"
								masterDropdownName="yarn-quality"
							/>
						</Col>

						<Col className="mb-3">
							<Field
								component={ReduxFormSelectField}
								name={`${quality_developed}.uom`}
								disabled={isViewOnly}
								options={uomOptions}
								touched={meta?.quality_developed?.[index]?.uom?.touched}
								error={errors?.quality_developed?.[index]?.uom}
							/>
						</Col>

						<Col className="mb-3">
							<Field
								component={ReduxFormAsyncSelect}
								name={`${quality_developed}.shade_id`}
								disabled={isFetchingDropdown || isViewOnly}
								touched={meta?.quality_developed?.[index]?.shade_id?.touched}
								error={errors?.quality_developed?.[index]?.shade_id}
								placeholder="Shade"
								masterDropdownName="shade"
							/>
						</Col>

						<Col className="mb-3">
							<Field
								name={`${quality_developed}.percentage`}
								component={ReduxFormTextField}
								type="number"
								step=".01"
								placeholder="Percentage"
								disabled={isViewOnly}
							/>
						</Col>

						{!isViewOnly && (
							<Col>
								<button
									className="me-2 btn btn-danger"
									type="button"
									onClick={() => fields.remove(index)}
								>
									Remove
								</button>
							</Col>
						)}
					</Row>
				);
			})}
		</div>
	);
};
