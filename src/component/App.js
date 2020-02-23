import React from "react";
import "./App.scss";
import Footer from "./Footer.js"
import Navigation from "./Navigation.js"
import Router from "./Router.js"

class App extends React.Component {
  render() {
    return (
      <div>
          <Navigation />
          <Router />
          <Footer />
      </div>
    );
  }
}
export default App;