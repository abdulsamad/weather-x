import * as types from './types';

export default (state, action) => {
	switch (action.type) {
		case types.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};

		case types.SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};

		case types.SET_PLACE:
			return {
				...state,
				place: action.payload,
			};

		case types.SET_UNIT:
			return {
				...state,
				unit: action.payload,
			};

		case types.SET_SETTINGS_OPEN:
			return {
				...state,
				settingsOpen: action.payload,
			};

		case types.SET_TIME_FORMAT:
			return {
				...state,
				timeFormat: action.payload,
			};

		case types.SET_NEXT_48_HOURS:
			return {
				...state,
				next48Hours: action.payload,
			};

		case types.SET_NEXT_7_DAYS:
			return {
				...state,
				next7Days: action.payload,
			};

		case types.SET_ALERT:
			return {
				...state,
				alert: action.payload,
			};

		case types.REMOVE_ALERT:
			return {
				...state,
				alert: null,
			};

		case types.SET_BG_DOWNLOAD_ON_LOAD:
			return {
				...state,
				downloadBackground: action.payload,
			};

		default:
			return state;
	}
};
