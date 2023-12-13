import { stateOptions } from "constants/master";
import { Col, Row } from "react-bootstrap";
import { Field } from "redux-form";

import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";

export const renderPartyDelivery = ({
	fields,
	meta,
	isFetchingDropdown,
	errors,
	isViewOnly,
}) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">Party Delivery</h4>
				{!isViewOnly && (
					<button
						className="me-2 btn btn-primary"
						type="button"
						onClick={() => fields.push({ id: null })}
					>
						Add Delivery
					</button>
				)}
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No party delivery added. Click on Add Delivery button to add one.
				</h6>
			)}
			{fields.map((delivery, index) => {
				return (
					<Row key={index} className="mb-3">
						<Col xs={3} className="mb-3">
							<Field
								name={`${delivery}.address_1`}
								component={ReduxFormTextField}
								maxLength={100}
								placeholder="Delivery Address Line 1"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${delivery}.address_2`}
								component={ReduxFormTextField}
								maxLength={100}
								placeholder="Delivery Address Line 2"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${delivery}.city`}
								component={ReduxFormTextField}
								maxLength={50}
								placeholder="Enter City"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								component={ReduxFormSelectField}
								name={`${delivery}.state`}
								disabled={isFetchingDropdown || isViewOnly}
								options={stateOptions}
								touched={meta?.delivery?.[index]?.state?.touched}
								error={errors?.delivery?.[index]?.state}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${delivery}.pincode`}
								component={ReduxFormTextField}
								type="number"
								placeholder="Enter Pincode"
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
