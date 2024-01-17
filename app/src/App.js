import "./App.css";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route path="/dashboard/:bookId" element={<Dashboard />} />
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
