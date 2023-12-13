import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addMasterList, editMasterList } from "actions/master";
import { closeModal } from "actions/modal";
import { getActiveModal } from "reducers/modal";

import { masterName, yarnQualityModalName } from "./yarnQualityConstants";
import YarnQualityForm from "./YarnQualityForm";

const YarnQualityModal = () => {
	const dispatch = useDispatch();
	const { status } = useParams();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === yarnQualityModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const formValues = { ...formData };
		formValues.count_id = formValues?.count_id?.value || null;
		formValues.filament_id = formValues?.filament_id?.value || null;
		formValues.denier_id = formValues?.denier_id?.value || null;

		formValues.quality_developed = formValues?.quality_developed?.map(qd => {
			return {
				...qd,
				quality_id: qd?.quality_id?.value,
				shade_id: qd?.shade_id?.value,
			};
		});

		formValues.party_shade_reference = formValues?.party_shade_reference?.map(
			psr => {
				return { ...psr, party_id: psr?.party_id?.value };
			}
		);

		if (data?.id) {
			dispatch(editMasterList(masterName, formValues, status));
		} else {
			dispatch(addMasterList(masterName, formValues, status));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(yarnQualityModalName));
	};

	const initialValues = {
		id: data.id || null,
		yarn_type: data.yarn_type || null,
		yarn_code: data.yarn_code || null,
		category: data.category || null,
		luster: data.luster || null,
		process: data.process || null,
		dye_type: data.dye_type || null,
		twist_type: data.twist_type || null,
		count_id: data.count
			? { label: data.count?.count, value: data.count?.id }
			: null,
		denier_id: data.denier
			? { label: data.denier?.denier, value: data.denier?.id }
			: null,
		filament_id: data.filament
			? { label: data.filament?.filament, value: data.filament?.id }
			: null,
		base_ply: data.base_ply || null,
		base_direction: data.base_direction || null,
		primary_tpm: data.primary_tpm || null,
		primary_td: data.primary_td || null,
		secondary_tpm: data.secondary_tpm || null,
		secondary_td: data.secondary_td || null,
		twist_ply: data.twist_ply || null,
		multi_tpm: data.multi_tpm || null,
		multi_td: data.multi_td || null,
		multi_ply: data.multi_ply || null,
		technical_description: data.technical_description || null,
		name: data.name || null,
		hsn_code: data.hsn_code || null,
		uom: data.uom || null,
		quality_developed:
			data.quality_developed?.map(qd => {
				return {
					id: qd?.id,
					quality_id: qd.quality
						? { label: qd.quality?.name, value: qd.quality?.id }
						: null,
					shade_id: qd.shade
						? { label: qd.shade?.shade_no, value: qd.shade?.id }
						: null,
					percentage: qd?.percentage,
					uom: qd?.uom,
				};
			}) || [],
		party_shade_reference:
			data.party_shade_reference?.map(psr => {
				return {
					id: psr?.id,
					party_id: psr.party
						? { label: psr.party?.name, value: psr.party?.id }
						: null,
					quality_reference: psr?.quality_reference,
				};
			}) || [],
		status: data.status || 1,
		reject_reason: data.reject_reason || null,
		update_quality_developed: false,
		update_party_shade_reference: false,
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
			<YarnQualityForm
				title={
					!!data?.isViewOnly
						? data?.name
						: `${data?.id ? "Edit" : "Add"} Yarn Quality`
				}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default YarnQualityModal;
