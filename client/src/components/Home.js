import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../actions';
import { typeFilter, createdFilter, orderSort } from '../actions/index';
// import '../styles/Home.css';
import Pokemon from './Pokemon';
import Paginado from './Paginado';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import foto from '../styles/styleImages/pkmlogo.png';
import Error from './Error';

export default function Home() {
	const dispatch = useDispatch();

	const pagePkm = useSelector((state) => state.allPokemons);
	const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
	const [pkmPerPage, setPkmPerPage] = useState(12);
	const lastPkmPage = currentPage * pkmPerPage;
	const firstPkmPage = lastPkmPage - pkmPerPage;
	const pkmInPage = pagePkm.slice(firstPkmPage, lastPkmPage);

	const paginado = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	const types = useSelector((state) => state.allTypes);
    // eslint-disable-next-line
	const [order, setOrder] = useState('');

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);

	function handleClick() {
		dispatch(getPokemons());
		setCurrentPage(1);
	}

	function handleFilterTypes(e) {
		dispatch(typeFilter(e.target.value));
		setCurrentPage(1);
	}

	function handleFilterCreated(e) {
		dispatch(createdFilter(e.target.value));
		setCurrentPage(1);
	}

	function handleOrderName(e) {
		dispatch(orderSort(e.target.value));
		setOrder(e.target.value);
		setCurrentPage(1);
	}

	return (
		<div className="homeContainer">
			<img
				onClick={(e) => {
					handleClick(e);
				}}
				src={foto}
				className="fotohome"
				alt="img not found"
			></img>
			<div>
				<NavBar />
			</div>
			<div>
				<SearchBar />
			</div>

			<div className="sideBar">
				<h1 className="orderTitle">Order by</h1>
				<div className="filterContainer">
					<div className="filterNameContainer">
						<h2 className="AlphTitle">Alphabetic/Attack</h2>
						<select className="filterName" onChange={(e) => handleOrderName(e)}>
							<option value="default">Default</option>
							<option value="az">A-Z</option>
							<option value="za">Z-A</option>
							<option value="bestAtk">Best atk</option>
							<option value="worstAtk">Worst atk</option>
						</select>
					</div>

					<div className="createdByContainer">
						<h2 className="CreatedTitle">Created </h2>
						<select
							className="filterCreated"
							onChange={(e) => handleFilterCreated(e)}
						>
							<option value="api&db">Api&Created</option>
							<option value="api">Api</option>
							<option value="created">Created</option>
						</select>
					</div>
					<div className="typesContainer">
						<h2 className="TypeTitle">Type</h2>
						<select
							className="filterType"
							onChange={(e) => handleFilterTypes(e)}
						>
							<option value="all">All</option>
							{types?.map((t) => {
								return (
									<option key={t.id} value={t.name}>
										{t.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<>
				<Paginado
					pkmPerPage={pkmPerPage}
					pagePkm={pagePkm.length}
					paginado={paginado}
				/>

				{pkmInPage === 'not found' ? (
					<Error />
				) : pkmInPage.length > 0 ? (
					pkmInPage.map((p) => {
						return (
							<div key={p.id} className="pokemonCards">
								<Pokemon
									key={p.id}
									id={p.id}
									name={p.name}
									image={p.image}
									type={p.type}
								/>
							</div>
						);
					})
				) : (
					<h1 className="homeLoading">Loading...</h1>
				)}
			</>
		</div>
	);
}