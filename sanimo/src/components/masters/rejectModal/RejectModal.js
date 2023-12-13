import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import { editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";
import RejectForm from "./RejectForm";

export const rejectModalName = "rejectModal";

const RejectModal = () => {
	const dispatch = useDispatch();
	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === rejectModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		delete formData?.masterName;
		delete formData?.currentStatus;
		if (data?.id) {
			dispatch(editMasterList(data?.masterName, formData, data?.currentStatus));
		}
	};

	const initialValues = {
		...data,
		reject_reason: data?.reject_reason || null,
	};

	const handleClose = () => {
		dispatch(closeModal(rejectModalName));
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
		>
			<RejectForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
			/>
		</Modal>
	);
};

export default RejectModal;
