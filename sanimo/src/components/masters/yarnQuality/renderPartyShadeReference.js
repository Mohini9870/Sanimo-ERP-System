import { Col, Row } from "react-bootstrap";
import { Field } from "redux-form";

import { ReduxFormAsyncSelect } from "utils/ReduxFormAsyncSelect";

export const renderPartyShadeReference = ({
	fields,
	meta,
	isFetchingDropdown,
	errors,
	isViewOnly,
}) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">Party Shade Reference</h4>
				{!isViewOnly && (
					<button
						className="me-2 btn btn-primary"
						type="button"
						onClick={() => fields.push({ id: null })}
					>
						Add Reference
					</button>
				)}
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No party shade reference added. Click on Add Reference button to add
					one.
				</h6>
			)}
			{fields.map((party_shade_reference, index) => {
				return (
					<Row key={index} className="mb-3">
						<Col className="mb-3">
							<Field
								component={ReduxFormAsyncSelect}
								name={`${party_shade_reference}.party_id`}
								disabled={isFetchingDropdown || isViewOnly}
								touched={
									meta?.party_shade_reference?.[index]?.party_id?.touched
								}
								error={errors?.party_shade_reference?.[index]?.party_id}
								placeholder="Supplier Name"
								masterDropdownName="party"
							/>
						</Col>

						<Col className="mb-3">
							<Field
								component="textarea"
								name={`${party_shade_reference}.quality_reference`}
								className="form-control"
								placeholder="Enter Party Quality Reference"
								maxLength={250}
								cols={60}
								rows={4}
								disabled={isViewOnly}
							/>
							{meta?.party_shade_reference?.[index]?.quality_reference
								?.touched &&
								errors?.party_shade_reference?.[index]?.quality_reference && (
									<span style={{ color: "red", marginLeft: "4px" }}>
										{errors?.party_shade_reference?.[index]?.quality_reference}
									</span>
								)}
						</Col>

						{!isViewOnly && (
							<Col xs={2}>
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
