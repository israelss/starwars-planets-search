import React from 'react';
import './App.css';
import FilterBar from './components/FilterBar';
import Table from './components/Table';
import { PlanetsProvider } from './context/PlanetsContext';

function App() {
  return (
    <PlanetsProvider>
      <FilterBar />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
