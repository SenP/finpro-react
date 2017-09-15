import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';
import { Watchlist } from '../../services';
import watchlistReducer from './watchlistReducer';

export default function(watchlists = initialState.watchlistsById, action) {
	switch (action.type) {
		case types.LOAD_WATCHLISTS_SUCCESS:
			return loadWatchlists(action.watchlists);

		case types.FETCH_QUOTES_SUCCESS: {
			let newState = {};
			for (const id in watchlists) {
				newState[id] = watchlistReducer(watchlists[id], action);
			}
			return newState;
		}

		case types.SAVE_WATCHLIST_SUCCESS:
		case types.SAVE_STOCK_SUCCESS:
		case types.DELETE_STOCK_SUCCESS:
			return saveWatchlist(watchlists, action);

		case types.DELETE_WATCHLIST_SUCCESS:
			return deleteWatchlist(watchlists, action);

		default:
			return watchlists;
	}
}

function loadWatchlists(watchlists = []) { 
	// Transform watchlists array into hash
	return watchlists.reduce((watchlistsHash, wl) => {
		let wlHashed = Object.assign(new Watchlist(), wl);
		wlHashed.stocksByCode = wl.stocks.reduce((stocksHash, stock) => {
			stocksHash[stock.code] = stock;
			return stocksHash;
		}, {});
		delete wlHashed.stocks;
		watchlistsHash[wl.id] = wlHashed;
		return watchlistsHash;
	}, {});
}

function saveWatchlist(watchlists, action) {
	let watchlist = watchlists[action.watchlist.id] || undefined;
	return Object.assign({}, watchlists, { [action.watchlist.id]: watchlistReducer(watchlist, action) });
}

function deleteWatchlist(watchlists, action) {
	// eslint-disable-next-line no-unused-vars
	let { [`${action.watchlist.id}`]: temp, ...newWatchlists } = watchlists;
	return newWatchlists ? newWatchlists : {};
}
