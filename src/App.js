import React, { useEffect } from 'react';
import { AppContextProvider } from './context/context';
import scrollSnapPolyfill from 'css-scroll-snap-polyfill';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import Next48Hours from './components/pages/Next48Hours';
import Next7Days from './components/pages/Next7Days';

const pages = [<Home />, <Next48Hours />, <Next7Days />];

function App() {
	useEffect(() => {
		scrollSnapPolyfill();
	}, []);

	return (
		<AppContextProvider>
			<Alert />
			<div className='App relative h-screen w-screen flex overflow-y-hidden'>
				{pages.map((component, i) => (
					<div key={i} className='page h-screen w-screen'>
						{pages[i]}
					</div>
				))}
			</div>
		</AppContextProvider>
	);
}

export default App;
