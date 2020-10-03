import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	useAppContextDispatch,
	useAppContextState,
} from '../../context/context';
import dayjs from 'dayjs';
import * as icons from '../utils/weather-icons';
import { useTrail, animated } from 'react-spring';

function Next48Hours() {
	const {
		unit,
		next48Hours,
		timeFormat,
		loading,
		place,
		alert,
	} = useAppContextState();
	const { findByName, setPlace } = useAppContextDispatch();
	const [trail, setTrail] = useTrail(next48Hours.length, () => ({
		config: {
			mass: 1,
			tension: 120,
			friction: 14,
		},
		from: {
			opacity: 0,
			transform: 'scaleY(0.8)',
		},
		to: {
			opacity: 1,
			transform: 'scaleY(1)',
		},
	}));
	const { city } = useParams();

	useEffect(() => {
		if (place !== city) {
			findByName(city, unit);
			setPlace(city);
		}

		setTrail({});
		// eslint-disable-next-line
	}, []);

	if (loading || alert) {
		return (
			<div
				className=' w-screen flex justify-center items-center'
				style={{
					height: 'calc(100vh - 60px)',
				}}>
				<div className='loader animate-spin w-12 h-12 border-4 border-blue-500 rounded-full'></div>
			</div>
		);
	}

	return (
		<div
			className='h-full w-screen text-white bg-fixed bg-no-repeat bg-gradient-to-b from-blue-500 to-red-600 px-5'
			style={{
				height: 'calc(100vh - 60px)',
			}}>
			<div className='vertical-scroll h-full w-full overflow-auto container mx-auto'>
				<h2 className='text-center font-bold my-5 text-lg'>Next 48h</h2>
				{next48Hours &&
					next48Hours.map(
						({ weather, wind_speed, wind_deg, temp, dt }, index) => (
							<Fragment key={dt}>
								{index === 0 && dayjs(dt * 1000).hour() !== 0 && (
									<h3 className='text-center uppercase mb-2 mt-4 font-semibold'>
										{dayjs(dt * 1000).format('dddd')}&nbsp;
										<span className='text-light'>
											{dayjs(dt * 1000).format('DD.MM')}
										</span>
									</h3>
								)}
								{dayjs(dt * 1000).hour() === 0 && (
									<h3 className='text-center uppercase mb-2 mt-4 font-semibold'>
										{dayjs(dt * 1000).format('dddd')}&nbsp;
										<span className='text-light'>
											{dayjs(dt * 1000).format('DD.MM')}
										</span>
									</h3>
								)}
								<animated.div style={trail[index]}>
									<div className='flex bg-gray-100 bg-opacity-25 rounded-lg p-2 my-2'>
										<div className='w-1/2 flex flex-col items-start my-1'>
											<span className='font-semibold h-8 flex items-center text-xl'>
												{timeFormat === 12
													? dayjs(dt * 1000).format('hh:mm A')
													: dayjs(dt * 1000).format('HH:mm')}
											</span>
											<span className='text-lg capitalize'>
												{weather[0].description}
											</span>
										</div>
										<div className='w-1/4 flex flex-col items-center text-center my-1 text-lg'>
											<div className='h-8'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='24'
													height='24'
													viewBox='0 0 24 24'
													className='w-6 h-6 fill-current'
													style={{
														transform: `rotateZ(${wind_deg}deg)`,
													}}>
													<path d='M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z' />
												</svg>
											</div>
											<span className='truncate'>
												{unit === 'imperial'
													? wind_speed + ' mi/hr'
													: wind_speed + ' m/s'}
											</span>
										</div>
										<div className='w-1/4 flex flex-col items-center my-1 text-lg'>
											<span className=''>{temp}&deg;</span>
											<img
												src={icons['_' + weather[0].icon]}
												className='h-8 transform scale-150'
												alt='weather icon'
											/>
										</div>
									</div>
								</animated.div>
							</Fragment>
						),
					)}
			</div>
		</div>
	);
}

export default Next48Hours;
