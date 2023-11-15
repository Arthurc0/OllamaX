import type { IconEnum } from '@/enums/base/IconEnum';
import type { RouteEnum } from '@/enums/base/RouteEnum';

export interface NavLinkInterface {
    icon: IconEnum;
    label: string;
    url: RouteEnum;
}
