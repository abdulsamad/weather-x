import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContextState } from '../../context/context';

function BottomNav() {
	const { place } = useAppContextState();

	return (
		<nav
			className='relative flex bg-white z-10 w-full shadow'
			style={{ height: 60 }}>
			<NavLink
				exact
				to={`/${place}`}
				activeClassName='text-blue-500 border-b-2 border-blue-500 font-medium'
				className='text-gray-600 py-4 px-6 block focus:outline-none w-full'>
				<svg
					className='w-6 h-6 mx-auto'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
				</svg>
				<span class='sr-only'>Home</span>
			</NavLink>
			<NavLink
				exact
				to={`/${place}/Next48Hours`}
				activeClassName='text-blue-500 border-b-2 border-blue-500 font-medium'
				className='text-gray-600 py-4 px-6 block focus:outline-none w-full'>
				<svg
					className='w-6 h-6 mx-auto'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
						clipRule='evenodd'
					/>
				</svg>
				<span class='sr-only'>Next 48 Hours</span>
			</NavLink>
			<NavLink
				exact
				to={`/${place}/Next7Days`}
				activeClassName='text-blue-500 border-b-2 border-blue-500 font-medium'
				className='text-gray-600 py-4 px-6 block focus:outline-none w-full'>
				<svg
					className='w-6 h-6 mx-auto'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
						clipRule='evenodd'
					/>
				</svg>
				<span class='sr-only'>Next 7 Days</span>
			</NavLink>
			<NavLink
				exact
				to={`/${place}/Stats`}
				activeClassName='text-blue-500 border-b-2 border-blue-500 font-medium'
				className='text-gray-600 py-4 px-6 block focus:outline-none w-full'>
				<svg
					className='w-6 h-6 mx-auto'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
				</svg>
				<span class='sr-only'>Stats</span>
			</NavLink>
		</nav>
	);
}

export default BottomNav;
