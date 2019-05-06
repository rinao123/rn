export const ADD = "ADD";
export const SUB = "SUB";
export const DEL = "DEL";
export const CLEAR = "CLEAR";

export function add(params) {
    return {
        type: ADD,
        params: params
    };
}

export function sub(params) {
    return {
        type: SUB,
        params: params
    };
}

export function del(params) {
    return {
        type: DEL,
        params: params
    };
}

export function clear() {
    return {
        type: CLEAR
    };
}