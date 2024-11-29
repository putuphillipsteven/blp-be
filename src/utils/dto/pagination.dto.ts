export class PaginationDto {
    constructor(
        public totalDatum?: number,
        public totalPages?: number,
        public currentPage?: number
    ) {
    }
}