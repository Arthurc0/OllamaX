import type { StatusCodeEnum } from '@/enums/StatusCodeEnum';
import type { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';

export const handleErrors = (statusCode: StatusCodeEnum, errorCode: ErrorCodeEnum): void => {
    throw createError({
        statusCode,
        statusMessage: errorCode
    });
};
