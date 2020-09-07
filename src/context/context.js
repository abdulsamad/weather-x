import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Reducer from './reducer';
import * as types from './types';
import axios from 'axios';

const AppContext = createContext();
const AppContextDispatch = createContext();

function AppContextProvider({ children }) {
	const initialState = {
		current: {},
		next48Hours: [],
		next7Days: [],
		city: null,
		unit: 'metric',
		timeFormat: 24,
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	useEffect(() => {
		try {
			if (state.city) {
				axios
					.get('https://api.openweathermap.org/data/2.5/weather', {
						params: {
							appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
							q: state.city,
							units: state.unit,
						},
					})
					.then(({ data }) => {
						//Filter with destructuring
						const {
							weather,
							main: {
								temp,
								feels_like,
								temp_min,
								temp_max,
								pressure,
								humidity,
							},
							wind,
							clouds,
							rain,
							snow,
							dt,
							sys: { country, sunrise, sunset },
							name,
							timezone,
						} = data;

						dispatch({
							type: types.SET_CURRENT,
							payload: {
								weather,
								temp,
								feels_like,
								temp_min,
								temp_max,
								pressure,
								humidity,
								wind,
								clouds,
								rain,
								snow,
								dt,
								country,
								sunrise,
								sunset,
								name,
								timezone,
							},
						});

						// Call after getting latitude, longitude (Cityname can't be used in onecall)
						axios
							.get('https://api.openweathermap.org/data/2.5/onecall', {
								params: {
									appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
									lat: data.coord.lat,
									lon: data.coord.lon,
									exclude: 'minutely,current',
									units: state.unit,
								},
							})
							.then(({ data: { daily, hourly } }) => {
								dispatch({
									type: types.SET_NEXT_48_HOURS,
									payload: hourly,
								});
								dispatch({
									type: types.SET_NEXT_7_DAYS,
									payload: daily,
								});
							});
					})
					.catch((err) => {
						throw err;
					});
			} else {
				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude, longitude }, timestamp }) => {
						Promise.all([
							axios.get('https://api.openweathermap.org/data/2.5/weather', {
								params: {
									appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
									lat: latitude,
									lon: longitude,
									units: state.unit,
								},
							}),
							axios.get('https://api.openweathermap.org/data/2.5/onecall', {
								params: {
									appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
									exclude: 'minutely,current',
									lat: latitude,
									lon: longitude,
									units: state.unit,
								},
							}),
						])
							.then(
								([
									{ data: currentData },
									{
										data: { daily, hourly },
									},
								]) => {
									//Filter with destructuring
									const {
										weather,
										main: {
											temp,
											feels_like,
											temp_min,
											temp_max,
											pressure,
											humidity,
										},
										wind,
										clouds,
										rain,
										snow,
										dt,
										sys: { country, sunrise, sunset },
										name,
										timezone,
									} = currentData;

									dispatch({
										type: types.SET_CURRENT,
										payload: {
											weather,
											temp,
											feels_like,
											temp_min,
											temp_max,
											pressure,
											humidity,
											wind,
											clouds,
											rain,
											snow,
											dt,
											country,
											sunrise,
											sunset,
											name,
											timezone,
										},
									});

									dispatch({
										type: types.SET_NEXT_48_HOURS,
										payload: hourly,
									});

									dispatch({
										type: types.SET_NEXT_7_DAYS,
										payload: daily,
									});
								},
							)
							.catch((err) => {
								throw err;
							});
					},
				);
			}
		} catch (err) {
			console.log(err);
		}
	}, [state.city, state.unit]);

	const setCity = (city) =>
		dispatch({
			type: types.SET_CITY,
			payload: city,
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

	return (
		<AppContext.Provider
			value={{
				current: state.current,
				next48Hours: state.next48Hours,
				next7Days: state.next7Days,
				unit: state.unit,
				city: state.city,
				timeFormat: state.timeFormat,
			}}>
			<AppContextDispatch.Provider
				value={{
					setCity,
					setUnit,
					setTimeFormat,
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
