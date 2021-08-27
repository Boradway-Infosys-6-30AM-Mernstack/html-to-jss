import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
