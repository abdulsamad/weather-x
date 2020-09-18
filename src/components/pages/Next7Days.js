import React from 'react';
import { useAppContextState } from '../../context/context';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import * as icons from '../utils/weather-icons';

function Next7Days() {
	const daily = useAppContextState().next7Days;
	dayjs.extend(utc);
	dayjs.extend(timezone);

	return (
		<div className='h-screen w-screen text-white bg-gradient-to-b bg-no-repeat from-purple-600 to-teal-500 relative px-5'>
			<div className='vertical-scroll h-full w-full overflow-auto'>
				<h2 className='text-center font-bold text-lg my-5'>Next 7 days</h2>
				{daily.map(
					({
						dt,
						weather,
						temp,
						pressure,
						humidity,
						uvi,
						wind_speed,
						wind_deg,
					}) => (
						<div
							key={dt}
							className='bg-gray-100 bg-opacity-25 p-5 rounded-lg my-2'>
							{
								<h3 className='text-center uppercase mb-2 font-semibold'>
									{dayjs(dt * 1000).format('dddd')}&nbsp;
									<span className='text-light'>
										{dayjs(dt * 1000).format('DD.MM')}
									</span>
								</h3>
							}
							<div className='flex justify-between'>
								<span className='capitalize'>{weather[0].description}</span>
								<img
									src={icons['_' + weather[0].icon]}
									className='w-8 h-8 transform scale-150'
									alt='weather icon'
								/>
								<span className='font-semibold'>
									{parseInt(temp.max)}&deg;{' '}
									<span className='font-light text-sm '>
										{parseInt(temp.min)}&deg;
									</span>
								</span>
							</div>
							<div className='flex my-2'>
								<div className='w-1/2'>
									<div>
										<strong className='semibold'>Pressure: </strong>
										{pressure} mbar
									</div>
									<div>
										<strong className='semibold'>UV Index: </strong>
										{uvi}
									</div>
								</div>
								<div className='w-1/2 pl-2'>
									<div>
										<strong className='semibold'>Humidity: </strong>
										{humidity}%
									</div>
									<div>
										<strong className='semibold'>Wind: </strong>
										{wind_speed} m/s
									</div>
								</div>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default Next7Days;
