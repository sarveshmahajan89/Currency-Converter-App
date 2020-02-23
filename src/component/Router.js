import React from "react";
import Home from "./Home.js"
import About from "./About.js"
import Contact from "./Contact.js"

import { Switch, Route } from 'react-router-dom';

class Router  extends React.Component {
    render() {
        return (
            <header className="masthead">
                <div className="container">
                    <div className="intro-text">
                        <div className="content" >
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/about' component={About} />
                                <Route path='/contact' component={Contact} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Router ;