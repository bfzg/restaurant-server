export type GlobalInterfaceReq<T> = {
    code: number;
    message: string;
    data: T;
}

export type QueryPagination = {
    page?:number;
    size?:number;
    query?:string;
}