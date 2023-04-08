import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import img from '../../components/img/pngegg.png'

export default function LandingPage() {
	return (
		<div className='landingContainer'>
			<img className='imagen' src={img} height="190px" alt='img not found'></img>
			<h1 className='landingTittle'>Welcome to <br />
			PokeApp!</h1>
			<Link to="/home"><br />
				<button className='landingButton'>Let's Go! </button>
			</Link>
		</div>
	);
}