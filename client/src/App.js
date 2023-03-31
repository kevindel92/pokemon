import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';
import Error from './components/Error';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/home/details/:id" component={Details} />
					<Route exact path="/create" component={Create} />
					<Route component={Error} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
