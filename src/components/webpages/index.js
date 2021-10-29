import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Comapny from './company';
const Webpages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Comapny} />
        </Router>
    );
};
export default Webpages;