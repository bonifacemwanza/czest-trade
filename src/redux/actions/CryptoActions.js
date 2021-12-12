import {ActionType} from "../constants/action-types";

export const setCryptoData = (data) => {
    return {
        type:ActionType.SET_CRYPTO_DATA,
        payload:data
    }
}
export const setNewsData = (data) => {
    return {
        type:ActionType.SET_NEWS,
        payload:data
    }
}
export const selectedCurrency = (data) => {
    return {
       type:ActionType.SELECTED_CURRENCY,
       payload:data
    }
}
export const removeSelectedCurrency = () => {
    return {
        type:ActionType.REMOVE_SELECTED_CURRENCY
    }
}
export const selectedCurrencyChart = (data) => {
    return {
       type:ActionType.SELECTED_CURRENCY_CHART,
       payload:data
    }
}
export const removeSelectedCurrencyChart = () => {
    return {
        type:ActionType.REMOVE_SELECTED_CURRENCY_CHART
    }
}

