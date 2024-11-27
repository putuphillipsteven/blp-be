export class PaginationDTO {
    constructor(
        public totalDatum?: number,
        public totalPages?: number,
        public currentPage?: number
    ) {
    }
}