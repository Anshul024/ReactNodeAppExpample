var React = require('react');
var ReactDOM = require('react-dom');
import {HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home.jsx';
import About from './components/About.jsx';

class App extends React.Component {
  render() {
     return (
        <div>
            <Router>
            <div>
               <h2>Welcome to React Router Tutorial</h2>
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/About'}>Login</Link></li>
               </ul>
               <hr />
               
               <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/About' component={About} />
                  <Route exact path='/About/:id' component={About} />
               </Switch>
            </div>
         </Router>
        </div>
     );
  }
}
export default App;
