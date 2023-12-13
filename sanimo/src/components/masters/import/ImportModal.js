import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import { importMaster } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import ImportForm from "./ImportForm";

export const importModalName = "importModal";

const ImportModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === importModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const form = new FormData();
		form.append("file", formData?.file);
		form.append("master", data?.masterName);
		if (data) {
			dispatch(importMaster(form, data?.masterName, data?.status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(importModalName));
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="sm"
		>
			<ImportForm
				title={`Import ${data?.masterName}`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
			/>
		</Modal>
	);
};

export default ImportModal;
