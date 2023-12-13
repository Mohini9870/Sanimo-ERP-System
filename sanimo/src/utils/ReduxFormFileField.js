const handleChange = async (event, input) => {
	event.preventDefault();
	let file = event.target.files[0];
	input.onChange(file);
};

export const ReduxFormFileField = ({ input, type, label, file, meta }) => {
	return (
		<>
			{label && (
				<label className="form-label">
					{file?.name ? (
						<>
							{label}: {file?.name}
						</>
					) : (
						label
					)}
				</label>
			)}
			<div>
				<input
					className="form-control"
					name={input.name}
					type={type}
					onChange={event => handleChange(event, input)}
				/>
			</div>
		</>
	);
};
