import React from 'react';
import foto from '../../styles/styleImages/vectorerror.png';
// import '../styles/Error.css';

export default function Error() {
	return (
		<div>
			<h1 className="errortitle">Pokemon not found!!</h1>
			<img className="errorimg" src={foto} alt="img not found"></img>
		</div>
	);
}