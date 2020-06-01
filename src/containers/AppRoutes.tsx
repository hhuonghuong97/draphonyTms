import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./login/Login";
import { NotFound } from "./not-found/NotFound";
import { TrainingOverview } from "./trainings/TrainingOverview";

export const AppRoutes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TrainingOverview} />
            <Route path="/login" component={Login} />

            <Route component={NotFound} />
        </Switch>
    </Router>
)
