import React from "react";

import './table.scss';

const Table = ({ sortData, dataContent, handleShow}) => {
	return (
		<div>
			<table className="text-center align-middle table table-dark table-bordered table-hover">
				<thead>
					<tr className="header sticky-top">
						<th className="hover" onClick={() => { sortData('index') }}>ID</th>
						<th className="hover" onClick={() => { sortData('name') }}>Name</th>
						<th className="hover" onClick={() => { sortData('height') }}>Height</th>
						<th className="hover" onClick={() => { sortData('mass') }}>Mass</th>
						<th>Hair color</th>
						<th>Skin color</th>
						<th>Eye color</th>
						<th>Birth year</th>
						<th>Gender</th>
						<th>Homeworld</th>
						<th>Films</th>
						<th>Species</th>
						<th>Starships</th>
						<th>Vehicles</th>
					</tr>
				</thead>
				<tbody>
					{dataContent.map(
						item => (
							<tr key={item.url}>
								<td>{item.url.match(/\d+(d+)?/)}</td>
								<td>{item.name}</td>
								<td>{item.height}</td>
								<td>{item.mass}</td>
								<td>{item.hair_color}</td>
								<td>{item.skin_color}</td>
								<td>{item.eye_color}</td>
								<td>{item.birth_year}</td>
								<td>{item.gender}</td>
								<td className="pointer" onClick={() => handleShow(item)}>{item.homeworld}</td>
								<td>{item.films.map(
									(item) => (
										item + '\n'
									))}
								</td>
								<td>{item.species == [].length ? "none" : item.species}
								</td>
								<td>{item.starships == [].length ? "none" : item.starships.map(
									(item) => (
										item + '\n'
									))}</td>
								<td>{item.vehicles == [].length ? "none" : item.vehicles.map(
									(item) => (
										item + '\n'
									))}</td>
							</tr>
						))}
				</tbody>

			</table>
		</div>
	)
}

export default Table;