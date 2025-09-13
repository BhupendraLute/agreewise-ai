import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationUI = ({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`?page=${Math.max(1, currentPage - 1)}`}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1
								? "pointer-events-none opacity-50"
								: ""
						}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }).map((_, i) => (
					<PaginationItem key={i}>
						<PaginationLink
							href={`?page=${i + 1}`}
							isActive={currentPage === i + 1}
						>
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href={`?page=${Math.min(totalPages, currentPage + 1)}`}
						aria-disabled={currentPage === totalPages}
						className={
							currentPage === totalPages
								? "pointer-events-none opacity-50"
								: ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationUI;
