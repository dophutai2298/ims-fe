import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import User from "../../pages/User";
import Profile from "../../pages/Profile";
import { authActions } from "../../redux/store";
const Main = (props) => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <Fragment>
      {/*TODO: Add header, navigator here, add layout, css here */}
      <div>
        <h1>Welcome</h1>
        <div>Login:{isLogin ? "true" : "false"}</div>
        <div>{token}</div>
        <div>{id}</div>
        <button onClick={logoutHandler}>LOGOUT</button>
      </div>
      <section>{props.children}</section>
      <section>
        <Link to={`${match.url}/user`}>User Link</Link>
        <Link to={`${match.url}/profile`}>Profile</Link>
      </section>

      <section>
        <Switch>
          <Route path={`${match.path}/user`}>
            <User />
          </Route>
          <Route path={`${match.path}/profile`}>
            <Profile />
          </Route>
        </Switch>
      </section>
    </Fragment>
  );
};
export default Main;
