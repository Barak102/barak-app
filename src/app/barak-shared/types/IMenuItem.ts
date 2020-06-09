export interface IMenuItem {
    name: string;
    navigateTo: string;
    isSelected: boolean;
    children ?: IMenuItem[];
    linkType?: LinkType;
    title ?: string;
    menuItemSelectedIndexTrigger?: any;
}

export enum LinkType {
    Jump = 0,
    Http = 1,
    Router = 2
}