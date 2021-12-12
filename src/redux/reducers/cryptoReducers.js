import { ActionType } from "../constants/action-types";

const initialState = {
    cryptoData:[],
  
}
const initNews = {
    newsData:[]
}
export const cryptoDataReducer = (state = initialState, {type,payload}) => {
    switch(type){
        case ActionType.SET_CRYPTO_DATA:
            return {...state, cryptoData:payload};
        default:
            return state;
    }
}
export const newsDataReducer = (state = initNews, {type,payload})=>{
    switch(type){
       case ActionType.SET_NEWS:
           return {...state,newsData:payload}
        default: 
           return state;
    }
}
export const selectedCurrencyReducer = (state = {}, {type,payload}) => {
    switch(type){
        case  ActionType.SELECTED_CURRENCY:
            return {...state, ...payload}
        case ActionType.REMOVE_SELECTED_CURRENCY:
            return { };
        default:
            return state;
    }
}
export const selectedCurrencyChartReducer = (state = {}, {type,payload}) => {
    switch(type) {
        case ActionType.SELECTED_CURRENCY_CHART:
            return {...state, ...payload}
        case ActionType.REMOVE_SELECTED_CURRENCY_CHART:
            return { };
        default:
            return state;
    }
}