import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Home";
import About from "./About";
import MovieList from "./MovieList";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/movie">
          <MovieList/>
        </Route>
        <Route exact path="/login">
          {/* Login */}
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
