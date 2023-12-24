import type { H3Event } from 'h3';
import type { StatusCodeEnum } from '@/enums/StatusCodeEnum';

export const sendResponse = (event: H3Event, statusCode: StatusCodeEnum, data: object | null = {}): object => {
    setResponseStatus(event, statusCode);
    return { data };
};
