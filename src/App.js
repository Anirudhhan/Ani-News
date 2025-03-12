import './App.css';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './components/NavBar';
import React, { Component } from 'react';
import News from './components/News';

export default class App extends Component {
  state = {progress: 0};
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <Router>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
        <NavBar/>
        <Routes>
          <Route path="/" element={<News setProgress = {this.setProgress} key = "general" category="general" />} />
          <Route path="/business" element={<News setProgress = {this.setProgress} key = "business" category="business" />} />
          <Route path="/entertainment" element={<News setProgress = {this.setProgress} key = "entertainment" category="entertainment" />} />
          <Route path="/Health" element={<News setProgress = {this.setProgress} key = "health" category="health" />} />
          <Route path="/Science" element={<News setProgress = {this.setProgress} key = "science" category="science" />} />
          <Route path="/Sports" element={<News setProgress = {this.setProgress} key = "sports" category="sports" />} />
          <Route path="/Technology" element={<News setProgress = {this.setProgress} key = "technology" category="technology" />} />
        </Routes>
      </Router>
    )
  }
}
