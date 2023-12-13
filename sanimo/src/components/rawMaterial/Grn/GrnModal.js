import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { addMasterList, editMasterList } from "actions/master";
import { grnModalName, tableName } from "./grnConstants";
import GrnForm from "./GrnForm";

const GrnModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === grnModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const formValues = {
			...formData,
			supplier_id: formData?.supplier_id?.value || null,
			yarn_quality_id: formData?.yarn_quality_id?.value || null,
			transport_id: formData?.transport_id?.value || null,
			process_id: formData?.process_id?.value || null,
			base_manufacturer_id: formData?.base_manufacturer_id?.value || null,
		};

		if (data?.id) {
			dispatch(editMasterList(tableName, formValues, 1));
		} else {
			dispatch(addMasterList(tableName, formValues, 1));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(grnModalName));
	};

	const initialValues = {
		id: data.id || null,
		grn_no: data.grn_no || null,
		grn_date: data.grn_date || null,
		grn_type: data.grn_type || null,
		vehicle_no: data.vehicle_no || null,
		security_inward_no: data.security_inward_no || null,
		security_inward_date: data.security_inward_date || null,
		challan_no: data.challan_no || null,
		challan_date: data.challan_date || null,
		invoice_no: data.invoice_no || null,
		invoice_date: data.invoice_date || null,
		lot_no: data.lot_no || null,
		grade: data?.grade || null,
		total_quantity: data.total_quantity || null,
		total_amount: data.total_amount || null,
		transport_id: data.transport
			? { label: data.transport?.name, value: data.transport?.id }
			: null,
		supplier_id: data.supplier
			? { label: data.supplier?.name, value: data.supplier?.id }
			: null,
		yarn_quality_id: data.yarn_quality
			? { label: data.yarn_quality?.name, value: data.yarn_quality?.id }
			: null,
		process_id: data.process
			? { label: data.process?.name, value: data.process?.id }
			: null,
		base_manufacturer_id: data.base_manufacturer
			? {
					label: data.base_manufacturer?.name,
					value: data.base_manufacturer?.id,
			  }
			: null,
		uom: data.uom || null,
		returnable_type: data.returnable_type || null,
		type_of_packing: data.type_of_packing || null,
		shade_entry: data.shade_entry || [],
		update_shade_entry: false,
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
			<GrnForm
				title={
					!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} GRN`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default GrnModal;
