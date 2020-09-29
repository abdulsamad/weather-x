import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from 'react';
import Reducer from './reducer';
import * as types from './types';
import axios from 'axios';

const AppContext = createContext();
const AppContextDispatch = createContext();

function AppContextProvider({ children }) {
	const initialState = {
		loading: true,
		place: null,
		current: {},
		next48Hours: [],
		next7Days: [],
		unit: 'metric',
		timeFormat: 24,
		alert: null,
		downloadBackground: false,
	};

	const [state, dispatch] = useReducer(Reducer, initialState);
	const settingsStr = useRef(localStorage.getItem('settings'));

	// Loading default settings
	useEffect(() => {
		if (settingsStr.current) {
			const parsedSettings = JSON.parse(settingsStr.current);

			parsedSettings.unit &&
				dispatch({
					type: types.SET_UNIT,
					payload: parsedSettings.unit,
				});

			parsedSettings.timeFormat &&
				dispatch({
					type: types.SET_TIME_FORMAT,
					payload: parsedSettings.timeFormat,
				});

			parsedSettings.downloadBackground &&
				dispatch({
					type: types.SET_BG_DOWNLOAD_ON_LOAD,
					payload: parsedSettings.downloadBackground,
				});
		}
	}, [settingsStr]);

	// Fetching data
	useEffect(() => {
		state.place
			? findByName(state.place, state.unit)
			: findByGeoLocation(state.unit);

		dispatch({
			type: types.SET_LOADING,
			payload: false,
		});

		// eslint-disable-next-line
	}, [state.unit]);

	const findByGeoLocation = (unit) => {
		navigator.geolocation.getCurrentPosition(
			async ({ coords: { latitude: lat, longitude: lon }, timestamp }) => {
				// OpenWeather API (OneCall)
				const onecall = await axios.get(
					'https://api.openweathermap.org/data/2.5/onecall',
					{
						params: {
							appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
							exclude: 'minutely',
							lat,
							lon,
							units: unit,
						},
					},
				);

				const { current, daily, hourly } = await onecall.data;

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

				// Reverse geocoding the return lat and lon
				const { city, state_district, state, country } = await reverseGeocode(
					lat,
					lon,
				);

				dispatch({
					type: types.SET_PLACE,
					payload: city || state_district || state || country,
				});
			},
			(err) => {
				setAlert({
					type: 'error',
					message: err,
				});
			},
		);
	};

	const findByName = async (place, unit) => {
		// Geocode the entered place
		const geocodesArr = await geocode(place);
		const { lat, lon } = geocodesArr[0];

		// OpenWeather API (OneCall)
		const onecall = await axios.get(
			'https://api.openweathermap.org/data/2.5/onecall',
			{
				params: {
					appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
					lat: lat,
					lon: lon,
					exclude: 'minutely',
					units: unit,
				},
			},
		);

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

		dispatch({
			type: types.SET_PLACE,
			payload: place,
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

	const setPlace = (place) =>
		dispatch({
			type: types.SET_PLACE,
			payload: place,
		});

	const setTimeFormat = (timeFormat) => {
		if (settingsStr.current) {
			localStorage.setItem(
				'settings',
				JSON.stringify({
					...JSON.parse(settingsStr.current),
					timeFormat,
				}),
			);
		} else {
			localStorage.setItem('settings', JSON.stringify({ timeFormat }));
		}

		dispatch({
			type: types.SET_TIME_FORMAT,
			payload: timeFormat,
		});
	};

	const setUnit = (unit) => {
		if (settingsStr.current) {
			localStorage.setItem(
				'settings',
				JSON.stringify({ ...JSON.parse(settingsStr.current), unit }),
			);
		} else {
			localStorage.setItem('settings', JSON.stringify({ unit }));
		}

		dispatch({
			type: types.SET_UNIT,
			payload: unit,
		});
	};

	const setAlert = ({ type, message }) => {
		dispatch({
			type: types.SET_ALERT,
			payload: { type, message },
		});

		setTimeout(removeAlert, 3000);
	};

	const removeAlert = () =>
		dispatch({
			type: types.REMOVE_ALERT,
		});

	const setDownloadBackgroundOnLoad = (downloadBackground) => {
		if (settingsStr.current) {
			localStorage.setItem(
				'settings',
				JSON.stringify({
					...JSON.parse(settingsStr.current),
					downloadBackground,
				}),
			);
		} else {
			localStorage.setItem('settings', JSON.stringify({ downloadBackground }));
		}

		dispatch({
			type: types.SET_BG_DOWNLOAD_ON_LOAD,
			payload: downloadBackground,
		});
	};

	return (
		<AppContext.Provider
			value={{
				place: state.place,
				current: state.current,
				next48Hours: state.next48Hours,
				next7Days: state.next7Days,
				unit: state.unit,
				timeFormat: state.timeFormat,
				alert: state.alert,
				downloadBackground: state.downloadBackground,
				loading: state.loading,
			}}>
			<AppContextDispatch.Provider
				value={{
					setPlace,
					setUnit,
					setTimeFormat,
					setAlert,
					removeAlert,
					findByGeoLocation,
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
