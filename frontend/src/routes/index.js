import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuLayout from "../components/MenuLayout";
import Dashboard from "../pages/college/Dashboard";
import Landing from "../pages/college/Landing";
// import PreLoader from "../components/PreLoader";

// const Landing = React.lazy(() => import("../pages/Landing"));

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard">
          {/* <Suspense fallback={<PreLoader />}> */}
          {/* <Landing /> */}
          {/* </Suspense> */}
          {/* <Preloader /> */}
          <MenuLayout layout={"admin"}>
            <Dashboard />
          </MenuLayout>
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
