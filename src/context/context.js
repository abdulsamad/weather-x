import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Reducer from './reducer';
import * as types from './types';
import axios from 'axios';

const AppContext = createContext();
const AppContextDispatch = createContext();

function AppContextProvider({ children }) {
	const initialState = {
		place: null,
		current: {},
		next48Hours: [],
		next7Days: [],
		unit: 'metric',
		timeFormat: 24,
		settingsOpen: false,
		alert: null,
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	useEffect(() => {
		state.place
			? findByName(state.place, state.unit)
			: findByGeoLocation(state.unit);

		// eslint-disable-next-line
	}, [state.unit]);

	const findByGeoLocation = (unit) => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude }, timestamp }) => {
				axios
					.get('https://api.openweathermap.org/data/2.5/onecall', {
						params: {
							appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
							exclude: 'minutely',
							lat: latitude,
							lon: longitude,
							units: unit,
						},
					})
					.then(({ data: { current, daily, hourly } }) => {
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

						// Reverse GeoCoding for place
						axios
							.get('https://nominatim.openstreetmap.org/reverse', {
								params: {
									lat: latitude,
									lon: longitude,
									format: 'json',
								},
							})
							.then(
								({
									data: {
										address: { city, state_district, state, country },
									},
								}) =>
									dispatch({
										type: types.SET_PLACE,
										payload: city || state_district || state || country,
									}),
							);
					})
					.catch((err) => {
						throw err;
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

	const findByName = (city, unit) => {
		axios
			.get('https://nominatim.openstreetmap.org/search', {
				params: {
					q: city,
					format: 'json',
				},
			})
			.then(({ data }) => {
				const { lat, lon } = data[0];

				axios
					.get('https://api.openweathermap.org/data/2.5/onecall', {
						params: {
							appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
							lat: lat,
							lon: lon,
							exclude: 'minutely',
							units: unit,
						},
					})
					.then(({ data: { current, daily, hourly } }) => {
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
							payload: city,
						});
					})
					.catch((err) => {
						throw err;
					});
			});
	};

	const setSettingsOpen = (bool) =>
		dispatch({
			type: types.SET_SETTINGS_OPEN,
			payload: bool,
		});

	const setPlace = (place) =>
		dispatch({
			type: types.SET_PLACE,
			payload: place,
		});

	const setTimeFormat = (format) =>
		dispatch({
			type: types.SET_TIME_FORMAT,
			payload: format,
		});

	const setUnit = (unit) =>
		dispatch({
			type: types.SET_UNIT,
			payload: unit,
		});

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

	return (
		<AppContext.Provider
			value={{
				place: state.place,
				current: state.current,
				next48Hours: state.next48Hours,
				next7Days: state.next7Days,
				unit: state.unit,
				timeFormat: state.timeFormat,
				settingsOpen: state.settingsOpen,
				alert: state.alert,
			}}>
			<AppContextDispatch.Provider
				value={{
					setPlace,
					setUnit,
					setTimeFormat,
					setSettingsOpen,
					setAlert,
					removeAlert,
					findByGeoLocation,
					findByName,
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
