import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//components
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount.js'
import Projects from './components/projects/Projects'
import PrivateRoute from './components/route/PrivateRoute'

//state
import ProjectState from './context/proyects/ProjectState'
import TaskState from './context/tasks/TaskState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/auth/authState'

import authToken from './config/authtoken'
const token = localStorage.getItem('token')
if(token){
  authToken(token)
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/new-account" component={NewAccount} />
                  <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
