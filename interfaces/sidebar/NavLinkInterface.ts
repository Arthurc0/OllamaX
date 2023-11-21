import type { IconEnum } from '@/enums/IconEnum';
import type { RouteEnum } from '@/enums/RouteEnum';

export interface NavLinkInterface {
    icon: IconEnum;
    label: string;
    url: RouteEnum;
}
