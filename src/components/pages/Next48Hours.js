import React, { Fragment } from 'react';
import { useAppContextState } from '../../context/context';
import dayjs from 'dayjs';
import * as icons from '../utils/weather-icons';

function Next48Hours() {
	const { unit, next48Hours, timeFormat } = useAppContextState();

	return (
		<div className='h-screen w-screen text-white bg-gradient-to-b from-blue-500 to-red-600 p-5'>
			<div className='fixed top-0 left-0 right-0 bottom-0 p-5 overflow-auto'>
				<h2 className='text-center font-bold mb-5 text-lg'>Next 48h</h2>
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
								<div className='container mx-auto'>
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
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												className='h-8 fill-current'
												style={{
													transform: `rotateZ(${wind_deg}deg)`,
												}}>
												<path d='M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z' />
											</svg>
											<span>
												{unit === 'imperial'
													? wind_speed + ' mi/hr'
													: wind_speed + ' m/s'}
											</span>
										</div>
										<div className='w-1/4 flex flex-col items-center my-1 text-lg'>
											<span className=''>{temp}&deg;</span>
											<img
												src={icons['_' + weather[0].icon]}
												className='h-8'
												alt='weather icon'
											/>
										</div>
									</div>
								</div>
							</Fragment>
						),
					)}
			</div>
		</div>
	);
}

export default Next48Hours;
