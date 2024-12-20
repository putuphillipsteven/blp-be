import {PaginationDto} from "./dto/pagination.dto";
import {Response} from "express";

export class ResponseHandler {
    public static generateResponse(res: Response, statusCode: number): Response;

    public static generateResponse(res: Response, statusCode: number, data: any | null ): Response;

    public static generateResponse(res: Response, statusCode: number, data: any | null, pagination?: PaginationDto ): Response;

    public static generateResponse(res: Response, statusCode: number, data?: any | null, pagination?: PaginationDto ) {
        let JSONResponse: any = {}

        if(data && pagination) {
            JSONResponse.status = statusCode;
            JSONResponse.pagination = pagination;
            JSONResponse.data = data;
        } else if (data) {
                JSONResponse.status = statusCode,
                JSONResponse.data = data;
            } else {
            JSONResponse.status = statusCode;
        }

        return res.json(JSONResponse);
    }
}
