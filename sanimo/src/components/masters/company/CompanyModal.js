import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { companyModalName, masterName } from "./companyConstants";
import CompanyForm from "./CompanyForm";

const CompanyModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === companyModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, { id: data?.id, ...formData }));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(companyModalName));
	};

	const initialValues = {
		name: data?.name,
		address_1: data?.address_1,
		address_2: data?.address_2,
		city: data?.city,
		state: data?.state,
		pincode: data?.pincode,
		email: data?.email,
		contact_person: data?.contact_person,
		phone: data?.phone,
		mobile: data?.mobile,
		gstin: data?.gstin,
		pan: data?.pan,
		fiscal_year_start: data?.fiscal_year_start,
		fiscal_year_end: data?.fiscal_year_end,
		logo: data?.logo,
		website: data?.website,
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
			<CompanyForm
				title={`${data?.id ? "Edit" : "Add"} Company`}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
			/>
		</Modal>
	);
};

export default CompanyModal;
