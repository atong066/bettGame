export const initalRebate = { 
    chessArray:0, 
    curRebate:0,
    egameArray:0,
    fishingArray:0, 
    esportArray:0,
    liveArray:0, 
    lotteryArray:0, 
    sportArray:0
}
export function promoRegReducer(state: any, action: any) {
switch (action.type) {
    case 1:
        return { ...state, chessArray: action.payload };
}

}