import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName, cleanPokemons } from '../../redux/actions';
import './SearchBar.css';

export default function SearchBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value.toLowerCase());
		// console.log(name);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(cleanPokemons(dispatch));
		dispatch(searchByName(name));
		setName('');
	}

	return (
		<div className="searchcont">
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					value={name}
					className="searchInput"
					type="text"
					placeholder="Search Pokemon"
					onChange={(e) => handleInputChange(e)}
				></input>
				<button className="searchBtn" type="submit">
					Search
				</button>
			</form>
		</div>
	);
}