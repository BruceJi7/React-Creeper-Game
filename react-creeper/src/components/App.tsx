import {Switch, Route} from "react-router-dom"

import Welcome from "../pages/Welcome/Welcome"
import Game from "../pages/Game"

import "../style/css/global.css"

const App = () => {
  return (
    <div className="App">
      <Switch>
      <Route path="/" exact>
        <Welcome/>
      </Route>
      <Route path="/game">
        <Game/>
      </Route>
        


      </Switch>
      
    </div>
  );
}

export default App;
