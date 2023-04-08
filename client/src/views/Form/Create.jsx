import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon, getTypes } from '../../redux/actions';
import './Create.css';

export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((state) => state.allTypes);
	const pokemons = useSelector((state) => state.allPokemons);
	const history = useHistory();
	const [input, setInput] = useState({
		name: '',
		image: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		type: []
	});

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value.toLowerCase()
		});
		setFormErrors(
			validate({
				...input,
				[e.target.name]: e.target.value
			})
		);
	};

	const handleSelect = (e) => {
		setInput({
			...input,
			type: [...new Set([...input.type, e.target.value])]
		});
		setFormErrors(
			validate({
				...input,
				type: [...input.type, e.target.value]
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let error = Object.keys(validate(input));
		if (error.length !== 0 || !input.type.length) {
			alert('Please, fill in the fields correctly');
			return;
		} else {
			dispatch(createPokemon(input));
			alert('your pokemon has been created');
			setInput({
				name: '',
				image: '',
				hp: '',
				attack: '',
				defense: '',
				speed: '',
				height: '',
				weight: '',
				type: []
			});
			history.push('/home');
		}
	};

	const handleDeleteT = (e) => {
		setInput({
			...input,
			type: []
		});
	};

	const [formErrors, setFormErrors] = useState({});

	function validateName(str) {
		if (!/^[a-zA-Z\s]*$/.test(input.name)) return true;
		if (str.length < 1) return true;
		if (str[0] === ' ') return true;
	}

	function validateDuplicateName(str) {
		let filtro = pokemons.filter((p) => p.name === str);
		if (filtro.length) {
			return true;
		}
	}

	function validateImg(str) {
		if (typeof str !== 'string') return true;
	}

	function validateTypes(input) {
		if (input.length < 1) return true;
		if (input.length > 2) return true;
	}

	function validateStats(num) {
		if (isNaN(num)) return true;
		if (num < 1 || num > 999) return true;
	}

	function validate(data) {
		let errors = {};
		if (validateName(data.name)) errors.name = 'Invalid name';
		if (validateImg(data.image)) errors.image = 'Invalid image url';
		if (validateTypes(data.type)) errors.type = 'Select types: min 1 max 2';
		if (validateStats(data.hp)) errors.hp = 'min value: 0, max value:999';
		if (validateStats(data.speed)) errors.speed = 'min value: 0, max value:999';
		if (validateStats(data.attack)) errors.attack = 'min value: 0, max value:999';
		if (validateStats(data.defense)) errors.defense = 'min value: 0, max value:999';
		if (validateStats(data.weight)) errors.weight = 'min value: 0, max value:999';
		if (validateStats(data.height)) errors.height = 'min value: 0, max value:999';
		if (validateDuplicateName(data.name)) errors.name = 'name has already exist';
		return errors;
	}

	return (
		<div className="createContainer">
			<Link to="/home">
				<button className="btnReturnCreate">Return Home</button>
			</Link>
			<h1 className="CreateTitle">Create your Pokemon!</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="formCreate">
					<div className="FormName">
						<label>Name: </label>
						<input
							type="string"
							value={input.name}
							name="name"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.name ? (
							<h4 className="errorForm">
								<small>{formErrors.name}</small>
							</h4>
						) : (
							false
						)}
					</div>
					<div className="formImg">
						<label>image: </label>
						<input
							type="url"
							value={input.image}
							name="image"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.image ? (
							<h4 className="errorForm">{formErrors.image}</h4>
						) : (
							false
						)}
					</div>
					<div className="formHp">
						<label>Hp: </label>
						<input
							type="number"
							value={input.hp}
							name="hp"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.hp ? (
							<h4 className="errorForm">{formErrors.hp}</h4>
						) : (
							false
						)}
					</div>
					<div className="formAtk">
						<label>Attack: </label>
						<input
							type="number"
							value={input.attack}
							name="attack"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.attack ? (
							<h4 className="errorForm">{formErrors.attack}</h4>
						) : (
							false
						)}
					</div>
					<div className="formDef">
						<label>Defense: </label>
						<input
							type="number"
							value={input.defense}
							name="defense"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.defense ? (
							<h4 className="errorForm">{formErrors.defense}</h4>
						) : (
							false
						)}
					</div>
					<div className="formSpeed">
						<label>Speed: </label>
						<input
							type="number"
							value={input.speed}
							name="speed"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.speed ? (
							<h4 className="errorForm">{formErrors.speed}</h4>
						) : (
							false
						)}
					</div>
					<div className="formHeight">
						<label>Height: </label>
						<input
							type="number"
							value={input.height}
							name="height"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.height ? (
							<h4 className="errorForm">{formErrors.height}</h4>
						) : (
							false
						)}
					</div>
					<div>
						<label className="formWeight">Weight: </label>
						<input
							type="number"
							value={input.weight}
							name="weight"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.weight ? (
							<h4 className="errorForm">{formErrors.weight}</h4>
						) : (
							false
						)}
					</div>
					<div className="formTypes">
						<label>Types: </label>
						<select onChange={(e) => handleSelect(e)}>
							{types.map((t) => (
								<option type="checkbox" key={t.name} value={t.name}>
									{t.name}
								</option>
							))}
						</select>
						<span>
							{input.type.map((t) => t + ', ')}
							<button
								className="typesBtn"
								type="button"
								onClick={handleDeleteT}
							>
								x
							</button>
						</span>

						{formErrors.type ? (
							<h4 className="errorForm">{formErrors.type}</h4>
						) : (
							false
						)}
					</div>
					<button type="submit" className="submitBtnCreate">Create</button>
				</div>
			</form>
		</div>
	);
}