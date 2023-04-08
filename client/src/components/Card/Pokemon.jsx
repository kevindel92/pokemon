import React from 'react';
import { Link } from 'react-router-dom';
import './Pokemon.css';
// import styles from './Pokemon.module.css';

export default function Pokemon({ id, name, type, image }) {
	return (
		<>
			<div className='pokemonCard'>
				<h3 className='cardName'>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
				<img className='cardImage' src={image} alt="img not found"></img>
				<h4 className="cardTypes">Types: {type}</h4><br />

				<div>
					<Link to={`/home/details/${id}`}>
						<button className="btnSee">See more details</button>
					</Link>
				</div>
			</div>
		</>
	);
}