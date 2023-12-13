import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({
	totalPages,
	itemsPerPage,
	totalItems,
	currentPage,
	handlePageChange,
}) => {
	let items = [];

	if (totalPages > 9) {
		let i = currentPage - 1 < 2 ? 1 : currentPage - 1;
		if (i + 9 > totalPages) {
			i = totalPages - 9;
		}
		for (let pageNum = i; pageNum <= i + 9; pageNum++) {
			items.push(
				<Pagination.Item
					key={pageNum}
					active={pageNum === currentPage}
					onClick={() => handlePageChange(pageNum, itemsPerPage)}
				>
					{pageNum}
				</Pagination.Item>
			);
		}
	} else {
		for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
			items.push(
				<Pagination.Item
					key={pageNum}
					active={pageNum === currentPage}
					onClick={() => handlePageChange(pageNum, itemsPerPage)}
				>
					{pageNum}
				</Pagination.Item>
			);
		}
	}

	return (
		<div className="d-flex flex-column justify-content-center mt-4">
			<Pagination className="m-0 justify-content-center">
				<Pagination.First
					onClick={() => handlePageChange(1, itemsPerPage)}
					disabled={currentPage === 1}
				/>
				<Pagination.Item
					onClick={() => handlePageChange(currentPage - 1, itemsPerPage)}
					disabled={currentPage === 1}
				>
					Previous
				</Pagination.Item>

				{items}

				<Pagination.Item
					onClick={() => handlePageChange(currentPage + 1, itemsPerPage)}
					disabled={currentPage === totalPages}
				>
					Next
				</Pagination.Item>
				<Pagination.Last
					onClick={() => handlePageChange(totalPages, itemsPerPage)}
					disabled={currentPage === totalPages}
				/>
			</Pagination>
			<p className="mt-2 align-self-center" style={{ color: "gray" }}>
				Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
				{currentPage * itemsPerPage > totalItems
					? totalItems
					: currentPage * itemsPerPage}{" "}
				out of {totalItems} results
			</p>
		</div>
	);
};

export default CustomPagination;
