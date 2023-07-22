import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import NotFound from "./Pages/NotFound/NotFound";
import Billing from "./Pages/Billing/Billing";
import Login from "./Components/Authentication/Login/Login";
import Register from "./Components/Authentication/Register/Register";
import UserProvider from "./context/userContext";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute/ProtectedRoute";
import { PaidAmountProvider } from "./context/PaidAmountContext";

function App() {
  return (
    <>
      <UserProvider>
        <PaidAmountProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/billing" element={<Billing />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </PaidAmountProvider>
      </UserProvider>
    </>
  );
}

export default App;
