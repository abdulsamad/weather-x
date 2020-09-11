import React, { useEffect, useState } from 'react';
import {
	useAppContextState,
	useAppContextDispatch,
} from '../../context/context';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import dayjs from 'dayjs';
import Settings from './Settings';

function Home() {
	const {
		timeFormat,
		unit,
		settingsOpen,
		current: {
			weather,
			temp,
			feels_like,
			temp_min,
			temp_max,
			pressure,
			humidity,
			wind,
			// clouds,
			// rain,
			// snow,
			// dt,
			// country,
			sunrise,
			sunset,
			name,
			// timezone,
		},
	} = useAppContextState();
	const { setSettingsOpen } = useAppContextDispatch();
	const [backgroundImageURL, setBackgroundImageURL] = useState(null);
	const [slideDown, slideDownSet] = useSpring(() => ({
		from: { opacity: 0, transform: 'translate3d(0, -20%, 0)' },
		to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
	}));
	const [fadeDown, fadeDownSet] = useSpring(() => ({
		from: { opacity: 0 },
		to: { opacity: 1 },
	}));
	const slideUp = useSpring({
		config: {
			tension: 200,
		},
		transform: settingsOpen ? 'translateY(0)' : 'translateY(100vh)',
	});

	useEffect(() => {
		if (!weather) return;

		axios
			.get('https://pixabay.com/api', {
				params: {
					key: process.env.REACT_APP_PIXABAY_API_KEY,
					q: weather[0].main,
					image_type: 'photo',
					safesearch: true,
					editors_choice: true,
					orientation:
						window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical',
					min_height: window.innerWidth > window.innerHeight ? 1080 : 720,
					max_height: window.innerHeight,
				},
			})
			.then(({ data: { hits } }) => {
				const randomNum = Math.floor(Math.random() * 19) + 1;

				'webformatURL' in hits[randomNum]
					? setBackgroundImageURL(hits[randomNum].webformatURL)
					: setBackgroundImageURL(null);
			})
			.catch(() => setBackgroundImageURL(null));

		// Update spring with new props
		slideDownSet();
		fadeDownSet();
	}, [weather, slideDownSet, fadeDownSet]);

	return (
		<>
			<div
				onClick={() => setSettingsOpen(!settingsOpen)}
				className='absolute top-0 right-0 p-5 text-white z-30'>
				<svg
					className='w-6 h-6'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d={
							settingsOpen
								? 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
						}
						clipRule='evenodd'
					/>
				</svg>
			</div>

			{/* Home */}
			<div
				className='home h-screen w-screen flex flex-col justify-between p-5 text-white'
				style={{
					background: backgroundImageURL
						? `url(${backgroundImageURL}) center / cover no-repeat`
						: 'linear-gradient(to top, #3a1c71, #d76d77, #ffaf7b)',
				}}>
				<animated.section style={slideDown} className='mt-5 mb-3 z-10'>
					<h2 className='text-xl font-bold'>{name}</h2>
					<h2 className='text-6xl'>{temp}&deg;</h2>
					<h3 className='text-sm'>
						Min:{temp_min}&deg; Max:{temp_max}&deg;
					</h3>
					{weather && <h3 className='text-xl'>{weather[0].main}</h3>}
					<h4 className='text-lg font-light'>Feels like {feels_like}&deg;</h4>
				</animated.section>

				<animated.section style={fadeDown} className='mb-5 z-10'>
					<table className='table'>
						<tbody>
							<tr>
								<td className='px-2'>Humidity</td>
								<td className='px-2'>{humidity}%</td>
							</tr>
							<tr>
								<td className='px-2'>Pressure</td>
								<td className='px-2'>{pressure} mbar</td>
							</tr>
							{wind && (
								<>
									<tr>
										<td className='px-2'>Wind Speed</td>
										<td className='px-2'>
											{unit === 'imperial'
												? wind.speed + ' mi/hr'
												: wind.speed + ' m/s'}
										</td>
									</tr>
									<tr>
										<td className='px-2'>Wind Direction</td>
										<td className='px-2'>{wind.deg}&deg;</td>
									</tr>
								</>
							)}
							<tr>
								<td className='px-2'>Sunrise</td>
								<td className='px-2'>
									{timeFormat === 12
										? dayjs(sunrise * 1000).format('hh:mm A')
										: dayjs(sunrise * 1000).format('HH:mm')}
								</td>
							</tr>
							<tr>
								<td className='px-2'>Sunset</td>
								<td className='px-2'>
									{timeFormat === 12
										? dayjs(sunset * 1000).format('hh:mm A')
										: dayjs(sunset * 1000).format('HH:mm')}
								</td>
							</tr>
						</tbody>
					</table>
				</animated.section>
			</div>

			{/* Settings */}
			<animated.div
				className='settings h-screen w-screen absolute top-0 left-0 bottom-0 right-0 p-5 bg-black bg-opacity-50 text-center text-white z-20'
				style={slideUp}>
				<Settings />
			</animated.div>
		</>
	);
}

export default Home;
