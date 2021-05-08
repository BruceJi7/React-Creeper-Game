import { Switch, Route } from "react-router-dom";

import About from "../pages/About";
import Game from "../pages/Game";
import Settings from "../pages/Settings";
import Welcome from "../pages/Welcome/Welcome";

import "../style/css/global.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
