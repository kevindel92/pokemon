import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import Details from './views/Detail/Details';
import Create from './views/Form/Create';
import Error from './components/Error/Error';

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