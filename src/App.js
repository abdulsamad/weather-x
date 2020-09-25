import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/context';
import Alert from './components/layout/Alert';
import BottomNav from './components/layout/BottomNav';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Next48Hours from './components/pages/Next48Hours';
import Next7Days from './components/pages/Next7Days';
import Statistics from './components/pages/Statistics';

function App() {
	return (
		<Router>
			<AppContextProvider>
				<Alert />
				<div className='App relative h-screen w-screen overflow-hidden'>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/Settings' exact component={Settings} />
						<Route path='/Next48Hours' exact component={Next48Hours} />
						<Route path='/Next7Days' exact component={Next7Days} />
						<Route path='/Stats' exact component={Statistics} />
					</Switch>
					<BottomNav />
				</div>
			</AppContextProvider>
		</Router>
	);
}

export default App;
