import React from 'react';
import './style.css';

import Pokedex from './components/Pokedex';
import PokDetails from './components/pokdetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="pok-app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Pokedex />}></Route>
          <Route path="/details/:pokId" exact element={<PokDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
