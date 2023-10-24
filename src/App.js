
import './App.css';
// import React, { useState } from "react";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trending from './components/Trending';
import Search from './components/Search';
import Series from './components/Series';
import Movies from './components/Movies';



function App() {
  
  return (
  <Router>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/trending'  element={<Trending/>}/>
      <Route path='/movies'  element={<Movies/>}/>
      <Route path='/series'  element={<Series/>}/>
      <Route path='/search'  element={<Search/>}/>
    </Routes>
  </Router>
    
  );
}

export default App;
