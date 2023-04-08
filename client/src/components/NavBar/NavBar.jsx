import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
	return (
		<div className="navBarContainer">
			<nav className="nav">
				<div className="link">
					<Link to="/create">
						<button className="navBtn">Create your Pokemon!</button>
					</Link>
				</div>
			</nav>
		</div>
	);
}
