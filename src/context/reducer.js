import * as types from './types';

export default (state, action) => {
	switch (action.type) {
		case types.SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};

		case types.SET_CITY:
			return {
				...state,
				city: action.payload,
			};

		case types.SET_UNIT:
			return {
				...state,
				unit: action.payload,
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

		default:
			return state;
	}
};
