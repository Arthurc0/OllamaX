import { Logger } from '@/server/utils/logger';

export default defineEventHandler((event) => {
    if (event.path.startsWith('/api')) Logger.info('Request', `${event.method} ${event.path}`);
});
