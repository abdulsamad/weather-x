import React, { useEffect, useState } from 'react';
import { useAppContextState } from '../../context/context';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import Settings from './Settings';

/* eslint-disable */

function Home() {
	const {
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
	} = useAppContextState().current;
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
			.get('https://pixabay.com/api/', {
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
						<h4 className='text-lg font-light'>Feels like {feels_like}</h4>
					</animated.div>
				</section>

				<animated.section style={fadeDown} className='mb-5 z-10'>
					<h4 className='text-lg'>
						Humidity <span className='ml-2'>{humidity}%</span>
					</h4>
					<h4 className='text-lg'>
						Pressure <span className='ml-2'>{pressure}mbar</span>
					</h4>
					{wind && (
						<>
							<h4 className='text-lg'>
								Wind Speed <span className='ml-2'>{wind.speed}m/s</span>
							</h4>
							<h4 className='text-lg'>
								Wind Direction <span className='ml-2'>{wind.deg}&deg;</span>
							</h4>{' '}
						</>
					)}
					<h4 className='text-lg'>
						Sunrise <span className='ml-2'>{sunrise}</span>
					</h4>
					<h4 className='text-lg'>
						Sunset <span className='ml-2'>{sunset}</span>
					</h4>
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
