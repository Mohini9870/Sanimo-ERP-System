import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "redux-form";

import { ReduxFormSelectField } from "utils/ReduxFormSelectField";
import { ReduxFormTextField } from "utils/ReduxFormTextField";
import { returnableItemOptions } from "./grnConstants";

export const renderShadeEntry = ({
	fields,
	metaData,
	isFetchingDropdown,
	errorsData,
	isViewOnly,
	shadeEntry,
	updateAmount,
	updateAvgWeight,
	isReturnable = false,
	typeOfPacking,
	meta: { submitFailed, error },
}) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">Shade Entry</h4>
				{!isViewOnly && (
					<button
						className="me-2 btn btn-primary"
						type="button"
						onClick={() =>
							fields.push({
								id: null,
								shade_no: "Raw White",
								amount: 0,
								api_weight: 0,
								average_weight: 0,
								gross_weight: null,
								tare_weight: null,
								returnable_item: null,
								returnable_item_rate: null,
								color: null,
								size: null,
								weight: null,
								pallet_type: null,
								pallet_no: null,
							})
						}
					>
						Add Shade Entry
					</button>
				)}
			</div>
			{fields?.length === 0 && (
				<>
					<h6 className="m-3">
						No shade entry added. Click on Add Shade Entry button to add one.
					</h6>
					{submitFailed && error && (
						<span style={{ color: "red", marginLeft: "4px" }}>{error}</span>
					)}
				</>
			)}
			{fields.map((shade_entry, index) => {
				const netWeight = +shadeEntry?.[index]?.net_weight || 0;
				const noOfCheese = +shadeEntry?.[index]?.no_of_cheese || 0;
				const rate = +shadeEntry?.[index]?.rate || 0;
				const returnableItem = shadeEntry?.[index]?.returnable_item || [];

				return (
					<Fragment key={index}>
						<div className="d-flex align-items-center">
							<div className="align-self-start">
								<Row>
									<Col className="mb-2">
										<Field
											label="Shade Number"
											name={`${shade_entry}.shade_no`}
											component={ReduxFormTextField}
											maxLength={30}
											placeholder="Shade Number"
											disabled={isViewOnly}
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Number of Carton/Pallet"
											name={`${shade_entry}.no_of_cartons`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Number of Carton/Pallet"
											disabled={isViewOnly}
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Number of Cheese"
											name={`${shade_entry}.no_of_cheese`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Number of Cheese"
											onChange={e => {
												updateAmount(index, e.target.value, rate);
												updateAvgWeight(index, e.target.value, netWeight);
											}}
											disabled={isViewOnly}
										/>
									</Col>
									{typeOfPacking === "Pallet" && (
										<Col className="mb-2">
											<Field
												label="Pallet Number"
												maxLength={30}
												name={`${shade_entry}.pallet_no`}
												component={ReduxFormTextField}
												placeholder="Pallet Number"
												disabled={isViewOnly}
											/>
										</Col>
									)}
									<Col className="mb-2">
										<Field
											label="Gross Weight"
											name={`${shade_entry}.gross_weight`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Gross Weight"
											disabled={isViewOnly}
										/>
									</Col>
								</Row>
								<Row>
									{isReturnable && (
										<>
											<Col className="mb-2">
												<Field
													component={ReduxFormSelectField}
													name={`${shade_entry}.returnable_item`}
													label="Returnable Item"
													disabled={isFetchingDropdown || isViewOnly}
													options={returnableItemOptions}
													touched={
														metaData?.shade_entry?.[index]?.returnable_item
															?.touched
													}
													error={
														errorsData?.shade_entry?.[index]?.returnable_item
													}
													placeholder="Returnable Item"
													isMulti
												/>
											</Col>
											<Col className="mb-2">
												<Field
													label="Returnable Item Rate"
													name={`${shade_entry}.returnable_item_rate`}
													component={ReduxFormTextField}
													type="number"
													placeholder="Returnable Item Rate"
													disabled={isViewOnly}
												/>
											</Col>
											{returnableItem.includes("Pallet") && (
												<Col className="mb-2">
													<Field
														label="Pallet Type"
														name={`${shade_entry}.pallet_type`}
														component={ReduxFormTextField}
														type="number"
														placeholder="Pallet Type"
														disabled={isViewOnly}
													/>
												</Col>
											)}
										</>
									)}
								</Row>
								{isReturnable &&
									(returnableItem.includes("Carton") ||
										returnableItem.includes("PVC Tube")) && (
										<Row>
											<Col className="mb-2">
												<Field
													label="Color"
													maxLength={50}
													name={`${shade_entry}.color`}
													component={ReduxFormTextField}
													placeholder="Color"
													disabled={isViewOnly}
												/>
											</Col>
											<Col className="mb-2">
												<Field
													label="Size"
													maxLength={50}
													name={`${shade_entry}.size`}
													component={ReduxFormTextField}
													placeholder="Size"
													disabled={isViewOnly}
												/>
											</Col>
											<Col className="mb-2">
												<Field
													label="Weight"
													name={`${shade_entry}.weight`}
													component={ReduxFormTextField}
													type="number"
													placeholder="Weight"
													disabled={isViewOnly}
												/>
											</Col>
										</Row>
									)}
								<Row>
									<Col className="mb-2">
										<Field
											label="Tare Weight"
											name={`${shade_entry}.tare_weight`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Tare weight"
											disabled={isViewOnly}
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Net Weight"
											name={`${shade_entry}.net_weight`}
											component={ReduxFormTextField}
											type="number"
											onChange={e =>
												updateAvgWeight(index, noOfCheese, e.target.value)
											}
											placeholder="Net Weight"
											disabled={isViewOnly}
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Average Weight"
											name={`${shade_entry}.average_weight`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Average weight"
											disabled
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="API Weight"
											name={`${shade_entry}.api_weight`}
											component={ReduxFormTextField}
											type="number"
											placeholder="API weight"
											disabled
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Rate"
											name={`${shade_entry}.rate`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Rate"
											onChange={e =>
												updateAmount(index, noOfCheese, e.target.value)
											}
											disabled={isViewOnly}
										/>
									</Col>
									<Col className="mb-2">
										<Field
											label="Amount"
											name={`${shade_entry}.amount`}
											component={ReduxFormTextField}
											type="number"
											placeholder="Amount"
											disabled
										/>
									</Col>
								</Row>
							</div>
							{!isViewOnly && (
								<div className="ms-3">
									<button
										className="me-2 btn btn-danger"
										type="button"
										onClick={() => fields.remove(index)}
									>
										Remove
									</button>
								</div>
							)}
						</div>
						<div
							className="w-100 m-3"
							style={{
								width: "100%",
								borderTop: "2px solid #CBCBCB",
							}}
						></div>
					</Fragment>
				);
			})}
		</div>
	);
};
