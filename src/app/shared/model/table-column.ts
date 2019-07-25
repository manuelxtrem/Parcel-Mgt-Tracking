
export class TableColumn {
    title?: string;
    data: string;
    checkbox?: boolean;
    template?: string;
    image?: TableImage;
    width?: string;
    nowrap?: boolean;
    buttons?: TableButton[];
}

export class TableImage {
    memberPicture: boolean;
    circle: boolean;
}

export class TableButton {
    title: string;
    icon: string;
    color? = 'currentColor';
    callback: (data) => any;
}

export class TableInfo {
    info: string;
    selection = [];
}

export class ResponsiveButton {
    title: string;
    icon: string;
    color? = 'currentColor';
    callback: (data) => any;
}
