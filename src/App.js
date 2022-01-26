import React from 'react';
import './App.css';
import FilterBar from './components/FilterBar';
import Sort from './components/Sort';
import Table from './components/Table';
import { PlanetsProvider } from './context/PlanetsContext';

function App() {
  return (
    <PlanetsProvider>
      <FilterBar />
      <Sort />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
