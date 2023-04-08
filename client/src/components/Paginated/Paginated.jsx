import React from 'react';
import './Paginated.css';
export default function Paginado({ pkmPerPage, pagePkm, paginado }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(pagePkm / pkmPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="paginado">
			<h4 className="page">Page: </h4>
			<nav>
				<ul className="pag">
					{pageNumbers &&
						pageNumbers.map((number) => (
							<button
								key={number}
								className="page-btn"
								onClick={() => paginado(number)}
							>
								{number}
							</button>
						))}
				</ul>
			</nav>
		</div>
	);
}