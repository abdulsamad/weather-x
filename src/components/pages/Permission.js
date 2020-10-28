import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContextDispatch } from '../../context/context';

function Permission({ history }) {
	const { reverseGeocode } = useAppContextDispatch();
	const [cityInpVal, setCityInpVal] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Check if geolocation permission granted and redirect
		navigator.permissions
			.query({ name: 'geolocation' })
			.then((permissionStatus) => {
				permissionStatus.state === 'granted'
					? openCurrentLocation()
					: setLoading(true);
			});

		// eslint-disable-next-line
	}, []);

	const openCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lon }, timestamp }) => {
				reverseGeocode(lat, lon).then(
					({ city, state_district, state, country }) => {
						history.push(`/${city || state_district || state || country}`);
					},
				);
			},
		);
	};

	if (!loading) return <div style={{ height: 'calc(100vh - 60px)' }}></div>;

	return (
		<div className='h-screen w-screen flex flex-col justify-between items-center p-4 bg-gradient-to-b from-pink-700 to-purple-800 text-white overflow-hidden'>
			<div className='text-center'>
				<h1 className='text-center font-semibold text-2xl mb-8'>Weather X</h1>
				<div className='bg-gray-200 text-gray-900 max-w-sm rounded-lg overflow-hidden p-4 shadow-lg'>
					<div className='text-center mb-2'>
						<h2 className='text-xl text-center mb-2'>
							This app needs location permission for checking the weather at
							your current location.
						</h2>
						<span className='text-red-500 text-sm'>
							<strong>Note:</strong> Your location data is only stored locally
							through LocalStorage.
						</span>
					</div>
					<button
						type='button'
						onClick={openCurrentLocation}
						className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg my-2  focus:outline-none'>
						<svg
							className='w-6 h-6 inline mr-2'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
								clipRule='evenodd'
							/>
						</svg>{' '}
						Grant Permission
					</button>
				</div>
				<p className='text-xl my-3'>or</p>
				<form
					className='text-left'
					onSubmit={() => history.push(`/${cityInpVal}`)}>
					<label className='block text-sm font-bold mb-2' htmlFor='cityName'>
						Enter City Name
					</label>
					<input
						type='text'
						id='cityName'
						onChange={(ev) => setCityInpVal(ev.target.value)}
						value={cityInpVal}
						className='bg-white shadow focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full text-black appearance-none leading-normal mb-2'
						placeholder='For E.g: New York'
					/>
				</form>
			</div>

			<footer>
				Made with{' '}
				<svg
					className='w-6 h-6 -mt-1 inline-block text-red-500'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
						clipRule='evenodd'
					/>
				</svg>{' '}
				by AbdulSamad
			</footer>
		</div>
	);
}

Permission.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Permission;
