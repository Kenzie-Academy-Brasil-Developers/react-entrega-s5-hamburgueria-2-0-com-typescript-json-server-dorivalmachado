import { ComponentType } from 'react';
import {Redirect, Route as AuthRoute, RouteProps as ReactRoutesProps} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface RouteProps extends ReactRoutesProps{
    isPrivate?: boolean;
    component: ComponentType;
}

export const Route = ({isPrivate=false, component: Component, ...rest}: RouteProps) => {

    const {data: {accessToken}} = useAuth();

    return(
        <AuthRoute 
            {...rest}
            render={() => 
                isPrivate === !!accessToken ? (
                    <Component />
                ) : (
                    <Redirect to={isPrivate ? '/' : '/dashboard'} />
                )
            }
        />
    )
}