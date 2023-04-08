import React from 'react';
// import foto from '../../components/img/vectorerror.png';
import './Error.css';
import foto from '../../components/img/zzz.webp'

export default function Error() {
	return (
		<div className='container'>
			<h1 className="errortitle">Pokemon not found!!</h1>
			<img className="errorimg" src={foto} alt="img not found"></img>
		</div>
	);
}