import React, { useEffect } from 'react';
import {
	useAppContextState,
	useAppContextDispatch,
} from '../../context/context';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
	AreaChart,
	Area,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	LineChart,
	Line,
	Bar,
	BarChart,
	ResponsiveContainer,
} from 'recharts';

function WeeklyStats() {
	const {
		timeFormat,
		next7Days,
		next48Hours,
		loading,
		place,
		unit,
	} = useAppContextState();
	const { findByName, setPlace } = useAppContextDispatch();
	const { city } = useParams();

	useEffect(() => {
		place !== city && findByName(city, unit);
		setPlace(city);

		// eslint-disable-next-line
	}, []);

	const next48HoursTempData = next48Hours.map(({ dt, temp }) => {
		const time =
			timeFormat === 12
				? dayjs(dt * 1000).format('hh:mm A')
				: dayjs(dt * 1000).format('HH:mm');

		return {
			time,
			temp,
		};
	});

	const nextWeekTempData = next7Days.map(
		({ dt, temp: { min, max, day, night } }) => {
			const time = dayjs(dt * 1000).format('dd');

			return {
				time,
				min,
				max,
				day,
				night,
			};
		},
	);

	const nextWeekUVIData = next7Days.map(({ dt, uvi }) => {
		const time = dayjs(dt * 1000).format('dd');

		return {
			time,
			uvi,
		};
	});

	if (loading) {
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
			className='overflow-x-hidden h-screen w-screen p-5 text-white bg-black'
			style={{
				height: 'calc(100vh - 60px)',
			}}>
			<h2 className='uppercase text-center text-lg font-bold my-5'>
				Temperature Next Week
			</h2>
			<div className='my-5'>
				<ResponsiveContainer height={200}>
					<LineChart data={nextWeekTempData}>
						<XAxis dataKey='time' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type='monotone' dataKey='min' stroke='#8884d8' />
						<Line type='monotone' dataKey='max' stroke='#82ca9d' />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<h2 className='uppercase text-center text-lg font-bold my-5'>
				Temperature Next 48 Hours
			</h2>
			<div className='overflow-x-auto my-5'>
				<AreaChart height={250} width={2800} data={next48HoursTempData}>
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
			<h2 className='uppercase text-center text-lg font-bold my-5'>
				UV Index Next Week
			</h2>
			<div className='my-5'>
				<ResponsiveContainer height={200}>
					<BarChart data={nextWeekUVIData}>
						<XAxis dataKey='time' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='uvi' fill='#82ca9d' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default WeeklyStats;
