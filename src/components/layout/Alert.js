import React from 'react';
import { useAppContextState } from '../../context/context';
import { useSpring, animated } from 'react-spring';

function Alert() {
	const { alert } = useAppContextState();
	const [slideDown, slideDownSet] = useSpring(() => ({
		from: {
			opacity: 0,
			transform: 'translateY(-100px)',
		},
		to: {
			opacity: 1,
			transform: 'translateY(0)',
		},
	}));

	slideDownSet();

	return (
		<>
			{alert && (
				<animated.div
					style={slideDown}
					role='alert'
					className={
						alert.type === 'info'
							? `fixed top-0 left-0 right-0 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 m-3 z-20`
							: `fixed top-0 left-0 right-0 bg-blue-100 border-l-4 border-red-500 text-red-700 p-4 m-3 z-20`
					}>
					<h2>{alert.message}</h2>
				</animated.div>
			)}
		</>
	);
}

export default Alert;
