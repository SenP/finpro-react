import * as types from "../actions/actionTypes.js";
import { Stock, WatchlistService } from "../../services";

export default function stockReducer(state = {}, action) {
  switch (action.type) {
    case types.ADD_STOCK_SUCCESS:
    case types.EDIT_STOCK_SUCCESS:
      WatchlistService.doSaveStock(action.stock, action.watchlist);
      return Object.assign(new Stock(), action.stock);

    case types.FETCH_QUOTES_SUCCESS:
      return updateQuotes(state, action);

    default:
      return state;
  }
}

function updateQuotes(state, action) {
  let quote = action.quotes.get(state.code);
  if (quote) {
    let newState = Object.assign(new Stock(), state);
    newState.lastPrice = quote.lastPrice || 0;
    newState.change = quote.change || 0;
    newState.percentChange = quote.percentChange || 0;
    return newState;
  } else {
    return state;
  }
}