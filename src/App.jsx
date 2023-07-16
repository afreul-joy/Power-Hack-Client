import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import NotFound from "./Pages/NotFound/NotFound";
import Billing from "./Pages/Billing/Billing";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
