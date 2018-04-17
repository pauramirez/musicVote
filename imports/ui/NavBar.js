import React, { Component } from "react";
import PropTypes from "prop-types";
import AccountsUIWrapper from './AccountsUIWrapper.js';
import {NavLink} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PostList from "./PostList"



class NavBar extends Component {

	constructor(props) {
    super(props);

    	this.state={
    	};
  	}

    render() {
        return (
            // <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="container">
                            <a className="navbar-brand" href="/">Music voter</a>
                            <AccountsUIWrapper/>
                            <p>Hi!</p>
                        </div>
                     </nav>
                </div>
            // </Router>
        );
    }
}
export default NavBar;