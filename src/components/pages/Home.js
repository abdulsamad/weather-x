import React, { useEffect, useState } from 'react';
import { useAppContextState } from '../../context/context';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import dayjs from 'dayjs';
import Settings from './Settings';

function Home() {
	/* eslint-disable */
	const {
		current: {
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
		timeFormat,
	} = useAppContextState();

	const [settingsOpen, setSettingsOpen] = useState(false);
	const [backgroundImageURL, setBackgroundImageURL] = useState('');
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
					min_height: window.innerHeight,
				},
			})
			.then(({ data }) => {
				const randomNum = Math.floor(Math.random() * 19) + 1;
				setBackgroundImageURL(data.hits[randomNum].webformatURL);
			});

		// Update spring with new props
		slideDownSet();
		fadeDownSet();
	}, [weather]);
	/* eslint-enable */
	return (
		<>
			<div className='absolute top-0 right-0 p-5 text-white z-30'>
				<i
					className={`my-5 transition-all duration-300 ${
						settingsOpen ? 'fas fa-times' : 'fas fa-bars'
					}`}
					onClick={() => setSettingsOpen((prevState) => !prevState)}></i>
			</div>

			{/* Home */}
			<div
				style={{
					background: backgroundImageURL
						? `url(${backgroundImageURL}) center / cover no-repeat`
						: 'linear-gradient(to top, #3a1c71, #d76d77, #ffaf7b)',
				}}
				className='home h-screen w-screen flex flex-col justify-between p-5 text-white'>
				<section className='mt-5 mb-3 z-10'>
					<animated.div style={slideDown}>
						<h2 className='text-xl font-bold'>{name}</h2>
						<h2 className='text-6xl'>{temp}&deg;</h2>
						{weather && <h3 className='text-xl'>{weather[0].main}</h3>}
						<h4 className='text-lg font-light'>Feels like {feels_like}&deg;</h4>
					</animated.div>
				</section>

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
										<td className='px-2'>{wind.speed} m/s</td>
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
