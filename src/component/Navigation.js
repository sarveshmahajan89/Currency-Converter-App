import React from "react";
import { Link } from 'react-router-dom';

class Navigation  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenuOption: false
        };
        this.updateMenuOption = this.updateMenuOption.bind(this);
    }

    updateMenuOption = (e) => {
        // show menu options for small screens size
        this.setState(prevState => ({
            showMenuOption: !prevState.showMenuOption
        }));
    };
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                          <span className='icon-image'>
                              <Link to="/"  className="navbar-brand js-scroll-trigger">
                                <img id="icon"  src="./images/logo.png" alt="icon" /> Currency Converter
                              </Link>
                          </span>
                        <button onClick={this.updateMenuOption} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fa fa-bars"></i>
                        </button>
                        <div className={this.state.showMenuOption ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link js-scroll-trigger">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link js-scroll-trigger" >About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link js-scroll-trigger">Contact</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default Navigation;