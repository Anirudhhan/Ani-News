import './App.css';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './components/NavBar';
import React, { useState } from 'react';
import News from './components/News';

const App =()=> {
  const [progress, setProgress] = useState(0)

    return (
      <Router>
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
        <NavBar/>
        <Routes>
          <Route path="/" element={<News setProgress = {setProgress} key = "general" category="general" />} />
          <Route path="/business" element={<News setProgress = {setProgress} key = "business" category="business" />} />
          <Route path="/entertainment" element={<News setProgress = {setProgress} key = "entertainment" category="entertainment" />} />
          <Route path="/Health" element={<News setProgress = {setProgress} key = "health" category="health" />} />
          <Route path="/Science" element={<News setProgress = {setProgress} key = "science" category="science" />} />
          <Route path="/Sports" element={<News setProgress = {setProgress} key = "sports" category="sports" />} />
          <Route path="/Technology" element={<News setProgress = {setProgress} key = "technology" category="technology" />} />
        </Routes>
      </Router>
    )
}

export default App;