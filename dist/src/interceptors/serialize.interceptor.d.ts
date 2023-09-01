import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
interface ClassConstructor {
    new (...args: any[]): {};
}
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: any);
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any>;
}
export declare function Serialize(dto: ClassConstructor): MethodDecorator & ClassDecorator;
export {};
