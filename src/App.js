import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './components/NavBar';
import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <Router>
        <h1> hello</h1>
        
        <NavBar/>
        <Routes>
          {/* <Route path="/business">
            <News category = "business"/>
          </Route> */}
          <Route path="/" element={<News key = "general" category="general" />} />
          <Route path="/business" element={<News key = "business" category="business" />} />
          <Route path="/entertainment" element={<News key = "entertainment" category="entertainment" />} />
          <Route path="/Health" element={<News key = "health" category="health" />} />
          <Route path="/Science" element={<News key = "science" category="science" />} />
          <Route path="/Sports" element={<News key = "sports" category="sports" />} />
          <Route path="/Technology" element={<News key = "technology" category="technology" />} />
        </Routes>
      </Router>
    )
  }
}
