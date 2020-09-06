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
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	useEffect(() => {
		try {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude }, timestamp }) => {
					Promise.all([
						axios.get('https://api.openweathermap.org/data/2.5/weather', {
							params: {
								appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
								lat: latitude,
								lon: longitude,
								units: 'metric',
							},
						}),
					])
						.then(([{ data: currentData }]) => {
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
						})
						.catch((err) => {
							throw err;
						});
				},
			);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				current: state.current,
				next48Hours: state.next48Hours,
				next7Days: state.next7Days,
			}}>
			<AppContextDispatch.Provider value={{}}>
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
