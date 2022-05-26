import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddOrganisation from "./components/organisation/AddOrganisation";
import Organisation from "./components/organisation/Organisation";
import OrganisationList from "./components/organisation/OrganisationList";

import AddTeam from "./components/team/AddTeam";
import Team from "./components/team/Team";
import TeamList from "./components/team/TeamList";

import AddUser from "./components/user/AddUser";
import User from "./components/user/User";
import UserList from "./components/user/UserList";


const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/organisations"} className="nav-link">
              Organisations
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/organisation/add"} className="nav-link">
              Add Organisation
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/organisations"]} component={OrganisationList} />
          <Route exact path={["/organisations/:id"]} component={Organisation} />
          <Route exact path={["/organisation/add"]} component={AddOrganisation} />
          <Route exact path={["/:organisationId/teams"]} component={TeamList} />
          <Route exact path="/:organisationId/addTeam" component={AddTeam} />
          <Route path="/:organisationId/teams/:id" component={Team} />
          <Route path="/:organisationId/users" component={UserList} />
          <Route path="/:organisationId/addUser" component={AddUser} />
          <Route path="/:organisationId/user/:id" component={User} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
