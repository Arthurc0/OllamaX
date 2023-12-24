import { StatusCodeEnum } from '@/enums/StatusCodeEnum';
import { getModels } from '@/server/services/ollama';
import { sendResponse } from '@/server/utils/sendResponse';

export default defineEventHandler(async (event) => {
    return sendResponse(event, StatusCodeEnum.OK, await getModels());
});
