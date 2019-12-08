export interface IMenuItem {
    name: string;
    navigateTo: string;
    isSelected: boolean;
    children ?: IMenuItem[];
    title ?: string;
}