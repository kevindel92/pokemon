import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pokemon.css';

export default function Pokemon({ id, name, type, image }) {
	return (
		<>
			<div className="pkmCard">
				<h3 className="cardName">{name.toUpperCase()}</h3>
				<img className="cardImg" src={image} alt="img not found"></img>
				<h4 className="cardTypes">Types: {type}</h4>

				<div>
					<Link to={`/home/details/${id}`}>
						<button className="btnSee">See more details</button>
					</Link>
				</div>
			</div>
		</>
	);
}