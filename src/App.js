import React, { useContext } from 'react'
import UserContext from "global/UserContext"
import RouterMain from "global/RouterMain"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Loading, Alert} from "components/misc/CustomComp"


const App =()=> {
  const ctx = useContext(UserContext);

  
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* {ctx.approve?.approve && <Route path="/:id" component={RouterMain} />} */}
          <Route path="/:id" component={RouterMain} />
        </Switch>
      </Router>

      {ctx.loading&&<Loading />}
      <Alert alert={ctx.alert} />
    </div>
  );
}

export default App;
