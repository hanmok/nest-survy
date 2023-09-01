export declare class CustomApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    constructor(statusCode: number, message: string, data?: T);
}
