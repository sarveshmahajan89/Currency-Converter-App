import React from "react";

class Footer  extends React.Component {
    render() {
        return (
            <footer className="text-center">
                <div className="footer-above">
                    <div className="container">
                        <div className="row">
                            <div className="footer-col col-md-12">
                                <h3>About Currency Converter App</h3>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-below">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <span>Copyright &copy; Currency Converter App 2020</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer ;