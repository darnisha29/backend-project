export const STATUS_CODE = {
    __SUCCESS: 200,
    __FAIL: 500,
    __UNAUTH: 401,
    __NOTFOUND: 401,
    __CONFLICT: 409,
    __EMPTY: 400

}
export const RESPONSE_MESSAGE = {
    __SUCCESS(str: string) { return `${str} successfully` },
    __FAIL(str: string) { return `${str} is failed` },
    __UNAUTH() { return `Invaild credentials` },
    __NOTFOUND(str: string) { return `${str} not found` },
    __CONFLICT(str: string) { return `${str} already exists` },
    __EMPTY(str: string) { return `${str} is empty` }
} 