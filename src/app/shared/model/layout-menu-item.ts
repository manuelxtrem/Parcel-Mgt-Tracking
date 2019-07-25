export class LayoutMenuItem {
    title: string;
    icon?: string;
    svgIcon?: string;
    link?: string;
    active?: boolean;
    expand?: boolean;
    submenu?: LayoutSubMenuItem[];
    hasAccess: () => boolean;
}
export class LayoutSubMenuItem {
    title: string;
    link: string;
    active?: boolean;
}
