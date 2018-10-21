import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Gravity from './Gravity'
import Cube from './Cube'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul className="nav nav-pills pull-right">
            <li><NavLink to="/cube">Cube</NavLink></li>
            <li><NavLink to="/gravity">Gravity</NavLink></li>
        </ul>
        <div>
        <Switch>
            <Route path="/cube" component={Cube}/>
            <Route path="/gravity" component={Gravity}/>
        </Switch>
        </div>
      </div>
    )
  }
}
 
export default App