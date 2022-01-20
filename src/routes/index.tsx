import { Switch } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Route } from "./Routes";


export const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/register' component={SignUp}/>
            <Route isPrivate exact path='/dashboard' component={Dashboard}/>
        </Switch>
    )
}