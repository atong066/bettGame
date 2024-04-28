

import { getDatetoday, lastMonth, getdatYesturday, thisWeek, thisMonth, lastWeek, getToday } from "../common/dateRangepicker";
import { addDays } from 'date-fns';
export const initialDate =
{
    startDate: getDatetoday()[0],
    endDate: getDatetoday()[1],
    customDate: false,
};

export const initialMonth =
{
    startDate: thisMonth()[0],
    endDate: thisMonth()[1],
    customDate: false,
};

export const initialWeek =
{
    startDate: thisWeek()[0],
    endDate: thisWeek()[1],
    customDate: false,
};

export const initialPromoOverViewDate =
{
    startDate: getToday()[0],
    customDate: false,
};


export function dateReducer(state: any, action: any) {
    console.log(action.dates)
    switch (action.type) {
        case "1":
            return { ...state, startDate: getDatetoday()[0], endDate: getDatetoday()[0] };
        case "2":
            return { ...state, startDate: getdatYesturday()[0], endDate: getdatYesturday()[1] };
        case "3":
            return { ...state, startDate: thisWeek()[0], endDate: thisWeek()[1] };
        case "4":
            return { ...state, startDate: lastWeek()[0], endDate: lastWeek()[1] };
        case "5":
            return { ...state, startDate: thisMonth()[0], endDate: thisMonth()[1] };
        case "6":
            return { ...state, startDate: lastMonth()[0], endDate: lastMonth()[1] };
        case "7":
            return { ...state, customDate: true };
        case "8":
            return { ...state, customDate: false };
        case "9":
            return { ...state,startDate: action.dates.startDate, endDate: action.dates.endDate,
                customDefaultDate:{...state.customDefaultDate,selection1:action.dates} };
        default:
            return state;
    }

}