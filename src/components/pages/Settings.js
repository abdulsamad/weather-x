import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	useAppContextState,
	useAppContextDispatch,
} from '../../context/context';
import openWeatherBrandLogo from '../../assets/openweather_logo.png';

function Settings({ setSettingsOpen }) {
	const { unit, timeFormat, downloadBackground } = useAppContextState();
	const {
		setUnit,
		setTimeFormat,
		findByName,
		findByGeoLocation,
		setDownloadBackgroundOnLoad,
	} = useAppContextDispatch();
	const [cityInpVal, setCityInpVal] = useState('');

	const onSubmit = (ev) => {
		ev.preventDefault();
		findByName(cityInpVal, unit);
		setCityInpVal('');
		setSettingsOpen(false);
	};

	const changeUnit = (unit) => (ev) => setUnit(unit);

	const changeTimeFormat = (format) => (ev) => setTimeFormat(format);

	return (
		<div className='container h-full mx-auto flex flex-col justify-between'>
			<div>
				<h1 className='text-lg font-bold mt-5'>Settings</h1>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						onChange={(ev) => setCityInpVal(ev.target.value)}
						value={cityInpVal}
						className='bg-white shadow focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full text-black appearance-none leading-normal mt-5 mb-2'
						placeholder='Enter city name'
					/>
				</form>
				<h6>Or</h6>
				<button
					onClick={() => findByGeoLocation(unit)}
					className='inline-flex bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-2 mb-5 shadow'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						className='fill-current h-100 w-4 mr-2'
						viewBox='0 0 24 24'>
						<path d='M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z' />
					</svg>{' '}
					<span>Current Location</span>
				</button>
				<div className='my-5'>
					<h2 className='text-lg'>Unit</h2>
					<div className='inline-flex my-2'>
						<button
							onClick={changeUnit('metric')}
							className={`${
								unit === 'metric'
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-800'
							} hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 rounded-l-lg`}>
							<div>Metric</div>
							<small>&deg;C, m/s</small>
						</button>
						<button
							onClick={changeUnit('imperial')}
							className={`${
								unit === 'imperial'
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-800'
							} hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 border-solid border-l-2 border-r-2 border-gray-400`}>
							<div>Imperial</div>
							<small>&deg;F, mi/hr</small>
						</button>
						<button
							onClick={changeUnit(null)}
							className={`${
								unit === null
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-800'
							} hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 rounded-r-lg`}>
							<div>Standard</div>
							<small>&deg;K, m/s</small>
						</button>
					</div>
				</div>
				<div className='mb-5'>
					<h2 className='text-lg'>Time Format</h2>
					<div className='inline-flex my-2'>
						<button
							onClick={changeTimeFormat(24)}
							className={`${
								timeFormat === 24
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-800'
							} hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 rounded-l-lg`}>
							<span>24h</span>
						</button>
						<button
							onClick={changeTimeFormat(12)}
							className={`${
								timeFormat === 12
									? 'bg-blue-500 hover:bg-blue-700 text-white'
									: 'bg-gray-300 text-gray-800'
							} hover:bg-blue-400 hover:text-white font-semibold py-2 px-4 rounded-r-lg`}>
							<span>12h</span>
						</button>
					</div>
				</div>
				<div className='my-5'>
					<input
						type='checkbox'
						onClick={() => setDownloadBackgroundOnLoad(!downloadBackground)}
						className='mr-2 leading-tight'
						id='downloadImageCheckbox'
					/>
					<label htmlFor='downloadImageCheckbox'>
						Always download new background image.
						<div className='text-red-500 text-xs italic'>
							<strong>Note:</strong>This may increase initial load time
							depending upon the internet connection.
						</div>
					</label>
				</div>
			</div>
			<footer className='p-5'>
				<h6 className='font-semibold'>Credits -</h6>
				<p>
					Logo/Favicon made by{' '}
					<a
						className='font-semibold'
						href='https://www.flaticon.com/authors/freepik'
						title='Freepik'>
						Freepik
					</a>{' '}
					from{' '}
					<a
						className='font-semibold'
						href='https://www.flaticon.com/'
						title='Flaticon'>
						www.flaticon.com
					</a>
				</p>
				<p className='my-5 text-center'>
					<sub className='font-semibold'>Powered by</sub>
					<img
						className='h-24 mx-auto'
						src={openWeatherBrandLogo}
						alt='openweather brand logo'
					/>
				</p>
			</footer>
		</div>
	);
}

Settings.propTypes = {
	setSettingsOpen: PropTypes.func.isRequired,
};

export default Settings;
