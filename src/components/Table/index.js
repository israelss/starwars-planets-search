import React, { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import './Table.css';

const Table = () => {
  const { tableData } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Created</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Terrain</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((data) => (
            <tr key={ data.name }>
              <td>{ data.name }</td>
              <td>{ data.climate }</td>
              <td>{ data.created }</td>
              <td>{ data.diameter }</td>
              <td>{ data.edited }</td>
              <td>{ data.films }</td>
              <td>{ data.gravity }</td>
              <td>{ data.orbital_period }</td>
              <td>{ data.population }</td>
              <td>{ data.rotation_period }</td>
              <td>{ data.surface_water }</td>
              <td>{ data.terrain }</td>
              <td>{ data.url }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Table;
