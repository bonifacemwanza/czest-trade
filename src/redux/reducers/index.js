import { combineReducers } from "redux";
import { cryptoDataReducer,newsDataReducer,selectedCurrencyReducer, selectedCurrencyChartReducer} from "./cryptoReducers";

const reducers = combineReducers({
    cryptoData: cryptoDataReducer,
    newsData: newsDataReducer,
    currency: selectedCurrencyReducer,
    currency_chart: selectedCurrencyChartReducer

});

export default reducers;