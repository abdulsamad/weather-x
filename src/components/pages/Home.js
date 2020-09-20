import React, { useEffect, useState } from 'react';
import {
	useAppContextState,
	useAppContextDispatch,
} from '../../context/context';
import { useSpring, animated } from 'react-spring';
import dayjs from 'dayjs';
import Settings from './Settings';

function Home() {
	const {
		place,
		timeFormat,
		unit,
		settingsOpen,
		current: {
			// dt,
			feels_like,
			humidity,
			pressure,
			sunrise,
			sunset,
			temp,
			weather,
			wind_deg,
			wind_speed,
			wind_gust,
			clouds,
			dew_point,
			uvi,
			visibility,
			rain,
			snow,
		},
	} = useAppContextState();
	const { setSettingsOpen } = useAppContextDispatch();
	const [showmore, setShowMore] = useState(false);
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
					className='w-6 h-6 mt-5'
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
				className={`h-screen w-screen flex flex-col justify-between p-5 text-white home bg-no-repeat bg-cover bg-center`}
				style={{
					backgroundImage:
						weather &&
						`url('https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}?${weather[0].main}')`,
				}}>
				<animated.section style={slideDown} className='mt-5 mb-3 z-10'>
					<h2 className='text-xl capitalize font-bold'>{place}</h2>
					<h2 className='text-6xl'>{temp}&deg;</h2>
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
							<tr>
								<td className='px-2'>Clouds</td>
								<td className='px-2'>{clouds}%</td>
							</tr>
							<tr>
								<td className='px-2'>Visibility</td>
								<td className='px-2'>{visibility} m</td>
							</tr>
							<tr>
								<td className='px-2'>Dew Point</td>
								<td className='px-2'>{dew_point}&deg;</td>
							</tr>
							<tr>
								<td className='px-2'>UV Index</td>
								<td className='px-2'>{uvi}</td>
							</tr>
							{showmore && (
								<>
									<tr>
										<td className='px-2'>Wind Speed</td>
										<td className='px-2'>
											{unit === 'imperial'
												? wind_speed + ' mi/hr'
												: wind_speed + ' m/s'}
										</td>
									</tr>
									{wind_gust && (
										<tr>
											<td className='px-2'>Wind Gust</td>
											<td className='px-2'>
												{unit === 'imperial'
													? wind_gust + ' mi/hr'
													: wind_gust + ' m/s'}
											</td>
										</tr>
									)}
									<tr>
										<td className='px-2'>Wind Direction</td>
										<td className='px-2'>{wind_deg}&deg;</td>
									</tr>
									{rain && (
										<tr>
											<td className='px-2'>Rain (1h)</td>
											<td className='px-2'>{rain['1h']} mm</td>
										</tr>
									)}
									{snow && (
										<tr>
											<td className='px-2'>Snow (1h)</td>
											<td className='px-2'>{snow['1h']} mm</td>
										</tr>
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
								</>
							)}
						</tbody>
					</table>
					<button
						className='flex items-center px-2 my-2'
						onClick={() => setShowMore((prevState) => !prevState)}>
						{showmore ? (
							<>
								Less
								<svg
									className='w-4 h-4 mx-1'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							</>
						) : (
							<>
								More
								<svg
									className='w-4 h-4 mx-1'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
							</>
						)}
					</button>
				</animated.section>
			</div>

			{/* Settings */}
			<animated.div
				className='settings h-screen w-screen absolute top-0 left-0 bottom-0 right-0 p-5 text-center text-white z-20'
				style={slideUp}>
				<Settings />
			</animated.div>
		</>
	);
}

export default Home;
