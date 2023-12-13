import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { masterName, partyModalName } from "./partyConstants";
import PartyForm from "./PartyForm";

const PartyModal = () => {
	const dispatch = useDispatch();
	const { status } = useParams();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === partyModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, status));
		} else {
			dispatch(addMasterList(masterName, formData, status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(partyModalName));
	};

	const initialValues = {
		id: data.id || null,
		party_type: data.party_type || null,
		name: data.name || null,
		billing_address_1: data.billing_address_1 || null,
		billing_address_2: data.billing_address_2 || null,
		billing_city: data.billing_city || null,
		billing_state: data.billing_state || null,
		billing_pincode: data.billing_pincode || null,
		email: data.email || null,
		contact_person: data.contact_person || null,
		phone: data.phone || null,
		mobile: data.mobile || null,
		gstin: data.gstin || null,
		pan: data.pan || null,
		delivery: data.delivery || [],
		tax_category: data.tax_category || null,
		aadhar: data.aadhar || null,
		broker_name: data.broker_name || null,
		broker_contact: data.broker_contact || null,
		broker_pan: data.broker_pan || null,
		broker_aadhar: data.broker_aadhar || null,
		broker_percentage: data.broker_percentage || null,
		status: data.status || 1,
		reject_reason: data?.reject_reason,
		update_delivery: false,
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="xl"
		>
			<PartyForm
				title={
					!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Party`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default PartyModal;
