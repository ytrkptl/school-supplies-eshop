import React, { useEffect, lazy, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";

import { GlobalStyle } from "./global.styles";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.reducer";
import { checkAndSeedCollections } from "@/utils/firebase/firebase.utils";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const ContactPage = lazy(() => import("./pages/contact/contact.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const PaymentSuccess = lazy(() => import("./pages/payment-status/payment-success.component"));
const PaymentFailure = lazy(() => import("./pages/payment-status/payment-failure.component"));

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
    checkAndSeedCollections();
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route exact path="/payment-success" element={<PaymentSuccess />} />
            <Route exact path="/payment-failure" element={<PaymentFailure />} />
            <Route
              exact
              path="/signin"
              element={
                currentUser ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default App;
