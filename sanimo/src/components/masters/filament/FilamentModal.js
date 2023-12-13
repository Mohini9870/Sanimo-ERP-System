import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { filamentModalName, masterName } from "./filamentConstants";
import FilamentForm from "./FilamentForm";

const FilamentModal = () => {
	const dispatch = useDispatch();
	const { status } = useParams();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === filamentModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, status));
		} else {
			dispatch(addMasterList(masterName, formData, status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(filamentModalName));
	};
	const initialValues = {
		id: data.id || null,
		filament: data.filament || null,
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
			size="sm"
		>
			<FilamentForm
				title={
					!!data?.isViewOnly
						? data?.name
						: `${data?.id ? "Edit" : "Add"} Filament`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default FilamentModal;
