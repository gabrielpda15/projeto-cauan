import { StatusCodes } from "./status-codes";

export class ErrorHandler extends Error {
    constructor(
        public statusCode: StatusCodes,
        public message: string
    ) {
        super();
    }
}