import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate ?: boolean;
  component : React.ComponentType;
}

// rota privada e usuário autenticado true/true = ok
// rota privada e usuário não autenticado true/false = Redirecionar pro login
// rota não é privada e usuário autenticado false/true = Redirecionar para o dashboard
// rota não é privada e usuário não autenticado false/false = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: { from: location },
        }}
        />
      ))}
    />
  );
};
export default Route;
