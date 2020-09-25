import React from 'react';
import { useAppContextState } from '../../context/context';
import dayjs from 'dayjs';
import {
	AreaChart,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';

function WeeklyStats() {
	const { timeFormat, next7Days, next48Hours } = useAppContextState();

	const next48HoursChartData = next48Hours.map(
		({ dt, temp, weather, wind_speed }) => {
			const time =
				timeFormat === 12
					? dayjs(dt * 1000).format('hh:mm A')
					: dayjs(dt * 1000).format('HH:mm');

			return {
				time,
				temp,
				wind_speed,
			};
		},
	);

	return (
		<div
			className='overflow-x-hidden h-screen w-screen p-5 text-white bg-black'
			style={{
				height: 'calc(100vh - 60px)',
			}}>
			<h2 className='uppercase text-center text-lg font-bold my-5'>
				Next 48 Hours
			</h2>
			<div className='overflow-x-auto'>
				<AreaChart
					height={250}
					width={2800}
					data={next48HoursChartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<defs>
						<linearGradient id='temp' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>
					<Legend />
					<XAxis dataKey='time' />
					<YAxis />
					<CartesianGrid strokeDasharray='3 3' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='temp'
						stroke='#8884d8'
						fillOpacity={1}
						fill='url(#temp)'
					/>
				</AreaChart>
			</div>

			<div className='mt-5'>
				<h3 className='text-center'>Precipitation</h3>
				<div className='chart-height flex justify-between w-full	'>
					{next7Days.map((day) => (
						<div
							key={day.dt}
							className='max-h-full flex flex-col justify-center item-center'>
							<h4 className='my-4 font-semibold'>26&deg;</h4>
							<div className='mx-auto h-full inline-block w-2 rounded-full bg-gradient-to-b from-green-400 via-red-500 to-pink-500 bg-opacity-300'>
								<div
									style={{ height: '80%' }}
									className='inline-block shadow-none w-2 bg-gray-200 rounded-t-full'></div>
							</div>
							<h4 className='my-4 font-semibold'>Sun</h4>
						</div>
					))}
				</div>
			</div>
			<div className='mt-5'>
				<h3 className='text-center'>Wind</h3>
				<div className='chart-height flex justify-between w-full'>
					{next7Days.map((day) => (
						<div
							key={day.dt}
							className='max-h-full flex flex-col justify-center item-center'>
							<h4 className='my-4 font-semibold'>26&deg;</h4>
							<div className='mx-auto h-full inline-block w-2 rounded-full bg-gradient-to-b from-green-400 via-red-500 to-pink-500 bg-opacity-300'>
								<div
									style={{ height: '80%' }}
									className='inline-block shadow-none w-2 bg-gray-200 rounded-t-full'></div>
							</div>
							<h4 className='my-4 font-semibold'>Sun</h4>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default WeeklyStats;
