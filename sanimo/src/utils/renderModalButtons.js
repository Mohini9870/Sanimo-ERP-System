import { Modal } from "react-bootstrap";

export const renderModalButtons = (onCancel, disabled) => {
	return (
		<Modal.Footer>
			<button className="btn btn-secondary" type="button" onClick={onCancel}>
				Close
			</button>
			<button
				className="btn ms-3 align-self-center fs-7 fw-500 bg-color-orange color-white table-btn"
				disabled={disabled}
				type="submit"
			>
				Submit
			</button>
		</Modal.Footer>
	);
};
