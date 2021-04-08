import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/context';
import Alert from './components/layout/Alert';
import BottomNav from './components/layout/BottomNav';
import Permission from './components/pages/Permission';
import Home from './components/pages/Home';
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
            <Route path='/:city/Next48Hours' exact component={Next48Hours} />
            <Route path='/:city/Next7Days' exact component={Next7Days} />
            <Route path='/:city/Stats' exact component={Statistics} />
            <Route path='/:city' exact component={Home} />
            <Route component={Permission} />
          </Switch>
          <BottomNav />
        </div>
      </AppContextProvider>
    </Router>
  );
}

export default App;
