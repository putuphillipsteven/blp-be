import {PaginationDTO} from "./dto/paginationdto";

export class ResponseHandler {
    public static generateResponse(statusCode: number, data: {} | null ): {};

    public static generateResponse(statusCode: number, data: {} | null, pagination: PaginationDTO ): {};

    public static generateResponse(statusCode: number, data: {} | null, pagination?: PaginationDTO ) {
        let response: any = {
            status: statusCode,
            data
        }

        if(pagination) {
            response.pagination = pagination;
        }

        return response;
    }
}
