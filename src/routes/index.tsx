import { Switch } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Purchases } from "../pages/Purchases";
import { SignUp } from "../pages/SignUp";
import { Route } from "./Routes";


export const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/register' component={SignUp}/>
            <Route isPrivate exact path='/dashboard' component={Dashboard}/>
            <Route isPrivate exact path='/purchases' component={Purchases}/>
        </Switch>
    )
}