import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { masterName, transportModalName } from "./transportConstants";
import TransportForm from "./TransportForm";

const TransportModal = () => {
	const dispatch = useDispatch();
	const { status } = useParams();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === transportModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, status));
		} else {
			dispatch(addMasterList(masterName, formData, status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(transportModalName));
	};

	const initialValues = {
		id: data.id || null,
		name: data.name || null,
		address_1: data.address_1 || null,
		address_2: data.address_2 || null,
		city: data.city || null,
		state: data.state || null,
		pincode: data.pincode || null,
		email: data.email || null,
		contact_person: data.contact_person || null,
		phone: data.phone || null,
		mobile: data.mobile || null,
		gstin: data.gstin || null,
		pan: data.pan || null,
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
			<TransportForm
				title={
					!!data?.isViewOnly
						? data?.name
						: `${data?.id ? "Edit" : "Add"} Transport`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default TransportModal;
