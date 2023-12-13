import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { lotModalName, masterName } from "./lotConstants";
import LotForm from "./LotForm";

const LotModal = () => {
	const dispatch = useDispatch();
	const { status } = useParams();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === lotModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const formValues = { ...formData };
		formValues.yarn_quality_id = formValues?.yarn_quality_id?.value;
		formValues.supplier_id = formValues?.supplier_id?.value;
		if (data?.id) {
			dispatch(editMasterList(masterName, formValues, status));
		} else {
			dispatch(addMasterList(masterName, formValues, status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(lotModalName));
	};

	const initialValues = {
		id: data.id || null,
		lot_no: data.lot_no || null,
		yarn_quality_id: data.yarn_quality
			? { label: data.yarn_quality?.name, value: data.yarn_quality?.id }
			: null,
		supplier_id: data.supplier
			? { label: data.supplier?.name, value: data.supplier?.id }
			: null,
		status: data.status || 1,
		reject_reason: data?.reject_reason,
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="lg"
		>
			<LotForm
				title={
					!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Lot`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default LotModal;
