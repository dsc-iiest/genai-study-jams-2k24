import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Homepage from './components/Homepage'
import Report from './components/LeaderB';
import Resources from './components/Resources';
import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollTop';



const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/leaderboard" element={<Report />} />
                <Route exact path="/resources" element={<Resources />} />
            </Routes>
            <Footer />
            {/* <ScrollToTop /> */}
        </Router>
    );
};

export default App;
