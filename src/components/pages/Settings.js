import React from 'react';

function Settings() {
	return (
		<>
			<h1 className='text-lg font-bold mt-5'>Settings</h1>
			<input
				type='email'
				className='bg-white shadow focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-5 mb-2'
				placeholder='Enter city name'
			/>
			<h6>Or</h6>
			<button className='inline-flex bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-2 mb-5 shadow'>
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
			<div className='mb-5'>
				<h2 className='text-lg'>Units</h2>
				<div className='inline-flex my-2'>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l-lg'>
						Celsius
					</button>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4'>
						Farenheit
					</button>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r-lg'>
						Kelvin
					</button>
				</div>
			</div>
			<div className='mb-5'>
				<h2 className='text-lg'>Time Format</h2>
				<div className='inline-flex my-2'>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l-lg'>
						24h
					</button>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r-lg'>
						12h
					</button>
				</div>
			</div>
			<div className='mb-5'>
				<h2 className='text-lg'>Wind Speed Unit</h2>
				<div className='inline-flex my-2'>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l-lg'>
						m/s
					</button>
					<button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r-lg'>
						km/h
					</button>
				</div>
			</div>
			<footer className='absolute bottom-0 left-0 right-0 p-5'>
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
			</footer>
		</>
	);
}

export default Settings;
