import React, { useRef } from 'react';
import { AppContextProvider } from './context/context';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import Next48Hours from './components/pages/Next48Hours';

const pages = [<Home />, <Next48Hours />];

function App() {
	const index = useRef(0);

	/* (Lodash Clamp in Vanilla) */
	const clamp = (num, clamp, higher) => {
		return higher
			? Math.min(Math.max(num, clamp), higher)
			: Math.min(num, clamp);
	};

	const [props, set] = useSprings(pages.length, (i) => ({
		x: i * window.innerWidth,
		display: 'block',
	}));

	const bind = useGesture({
		onDrag: ({
			down,
			delta: [xDelta],
			direction: [xDir],
			distance,
			cancel,
		}) => {
			if (down && distance > window.innerWidth / 2) {
				cancel(
					(index.current = clamp(
						index.current + (xDir > 0 ? -1 : 1),
						0,
						pages.length - 1,
					)),
				);
			}

			set((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: 'none' };
				const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
				return { x, display: 'flex' };
			});
		},
	});

	return (
		<AppContextProvider>
			<Alert />
			<div className='relative h-screen w-screen overflow-hidden'>
				{props.map(({ x, display }, i) => (
					<animated.div
						{...bind()}
						key={i}
						className='absolute h-full w-full overflow-hidden'
						style={{
							display,
							transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
						}}>
						{pages[i]}
					</animated.div>
				))}
			</div>
		</AppContextProvider>
	);
}

export default App;
