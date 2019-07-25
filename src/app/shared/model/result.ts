export class Result<T> {
    data: T[];
    page: number;
    pageSize?: number;
    total: number;

    constructor() {
        this.page = 0;
        this.total = 0;
        this.data = [];
    }
}

export interface IResult<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
}

export interface  XResponse<T> {
    status: boolean;
    message: string;
    data?: T;
}
