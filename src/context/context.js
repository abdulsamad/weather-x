import React, { createContext, useContext, useReducer } from 'react';
import Reducer from './reducer';
import * as types from './types';
import axios from 'axios';

const AppContext = createContext();
const AppContextDispatch = createContext();

function AppContextProvider({ children }) {
	const initialState = {
		place: null,
		loading: true,
		current: {},
		next48Hours: [],
		next7Days: [],
		unit: localStorage.getItem('unit') || 'metric',
		timeFormat: parseInt(localStorage.getItem('timeFormat')) || 24,
		alert: null,
		downloadBackground: JSON.parse(localStorage.getItem('downloadBackground')),
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	const findByName = async (place, unit) => {
		try {
			// Geocode the entered place
			const geocodesArr = await geocode(place);
			const { lat, lon } = geocodesArr[0];

			// OpenWeatherMap API call (API Key will be added in serverless function)
			const onecall = await axios.get('/api/onecall', {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'minutely',
					units: unit,
				},
			});

			const { current, daily, hourly } = onecall.data;

			dispatch({
				type: types.SET_CURRENT,
				payload: current,
			});

			dispatch({
				type: types.SET_NEXT_48_HOURS,
				payload: hourly,
			});

			dispatch({
				type: types.SET_NEXT_7_DAYS,
				payload: daily,
			});
		} catch (err) {
			setAlert({
				type: 'danger',
				message: `Sorry! Location not found! You'll be redirected in few seconds.`,
			});
			setTimeout(
				() => (window.location = process.env.REACT_APP_PROJECT_URL),
				4800,
			);
		}

		// Stop Loading
		dispatch({
			type: types.SET_LOADING,
			payload: false,
		});
	};

	const geocode = async (place) => {
		const call = await axios.get('https://nominatim.openstreetmap.org/search', {
			params: {
				q: place,
				format: 'json',
			},
		});

		return await call.data;
	};

	const reverseGeocode = async (lat, lon) => {
		const call = await axios.get(
			'https://nominatim.openstreetmap.org/reverse',
			{
				params: {
					lat,
					lon,
					format: 'json',
				},
			},
		);

		return await call.data.address;
	};

	const setPlace = (city) => {
		dispatch({
			type: types.SET_PLACE,
			payload: city,
		});
	};

	const setAlert = ({ type, message }) => {
		dispatch({
			type: types.SET_ALERT,
			payload: { type, message },
		});

		setTimeout(removeAlert, 5000);
	};

	const removeAlert = () => {
		dispatch({
			type: types.REMOVE_ALERT,
		});
	};

	const setTimeFormat = (timeFormat) => {
		localStorage.setItem('timeFormat', timeFormat);

		dispatch({
			type: types.SET_TIME_FORMAT,
			payload: timeFormat,
		});
	};

	const setUnit = (unit) => {
		localStorage.setItem('unit', unit);

		dispatch({
			type: types.SET_UNIT,
			payload: unit,
		});
	};

	const setDownloadBackgroundOnLoad = (downloadBackground) => {
		localStorage.setItem('downloadBackground', downloadBackground);

		dispatch({
			type: types.SET_BG_DOWNLOAD_ON_LOAD,
			payload: downloadBackground,
		});
	};

	return (
		<AppContext.Provider
			value={{
				current: state.current,
				next48Hours: state.next48Hours,
				next7Days: state.next7Days,
				unit: state.unit,
				timeFormat: state.timeFormat,
				alert: state.alert,
				downloadBackground: state.downloadBackground,
				loading: state.loading,
				place: state.place,
			}}>
			<AppContextDispatch.Provider
				value={{
					setUnit,
					setTimeFormat,
					setAlert,
					setPlace,
					removeAlert,
					geocode,
					reverseGeocode,
					findByName,
					setDownloadBackgroundOnLoad,
				}}>
				{children}
			</AppContextDispatch.Provider>
		</AppContext.Provider>
	);
}

const useAppContextState = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error(
			'useAppContextState must be used within a AppContext Provider.',
		);
	}

	return context;
};

const useAppContextDispatch = () => {
	const context = useContext(AppContextDispatch);

	if (context === undefined) {
		throw new Error(
			'useAppContextDispatch must be used within a AppContextDispatch Provider.',
		);
	}

	return context;
};

export { AppContextProvider, useAppContextState, useAppContextDispatch };
