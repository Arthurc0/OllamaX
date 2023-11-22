import type { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import type { StatusCodeEnum } from '@/enums/StatusCodeEnum';

export class RequestError extends Error {
    public errorCode: ErrorCodeEnum;
    public statusCode: StatusCodeEnum;

    public constructor(errorCode: ErrorCodeEnum, statusCode: StatusCodeEnum) {
        super();
        Object.setPrototypeOf(this, RequestError.prototype);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}
