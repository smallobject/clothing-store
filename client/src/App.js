import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import CheckOutPage from './pages/checkout/checkout.component';
// import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
import ErrorBoundray from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const CheckOutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundray>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/' component={HomePage} />;
            <Route path='/shop' component={ShopPage} />;
            <Route exact path='/checkout' component={CheckOutPage} />;
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
              }
            />
          </Switch>
        </Suspense>
      </ErrorBoundray>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToprops = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToprops)(App);
