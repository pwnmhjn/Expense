import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import NotFound from "./pages/NotFound";
import Header from "./components/UI/Header";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
function App() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  console.log("Authenticated User", data);
  console.log("error", error);
  console.log("loading", loading);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={data?.authUser ? <TransactionPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
