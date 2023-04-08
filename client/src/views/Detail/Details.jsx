import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getDetails } from '../../redux/actions';
import './Details.css';
// import loading from '../../components/img/loading.45600eb9.gif'
import loading from '../../components/img/www.gif'

export default function Details() {
	let dispatch = useDispatch();
	let pkmDetail = useSelector((state) => state.pokemon);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);

	return (
		<>
			<div className="detailsContainer">
				<Link to="/home">
					<button className="buttonHome">Return to home</button>
				</Link>
				{pkmDetail.name ? (
					<div className="detailsCard">
						<div className="detailName">
							<h1>Name: {pkmDetail.name.charAt(0).toUpperCase() + pkmDetail.name.slice(1)}</h1><br />
							<h2>Id: {pkmDetail.id}</h2>
						</div>
						<img
							src={pkmDetail.image}
							alt="img not found"
							className="detailImg"
						></img>

						<div className="detailStats">
							<h2>Stats: </h2><br />
							<ul className="ulTypes">
								<li className="detailTypes">Types: {pkmDetail.type}</li>
								<li>Hp: {pkmDetail.hp}</li>
								<li>Attack: {pkmDetail.attack} </li>
								<li>Defense: {pkmDetail.defense}</li>
								<li>Speed: {pkmDetail.speed}</li>
								<li>Height: {pkmDetail.height / 10} Mt</li>
								<li>Weight: {pkmDetail.weight / 10} Kg</li>
							</ul>
						</div>
					</div>
				) : (
					<div>
						<img className='loading' src={loading} alt='Loading...' ></img>
					</div>
					// <h1 className="detailLoading">Loading...</h1>
				)}
			</div>
		</>
	);
}
