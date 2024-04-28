export const types={
    login:false
}

export function loginReducer(state: any, action: any) {
    return {...state,login:action.payload}
}