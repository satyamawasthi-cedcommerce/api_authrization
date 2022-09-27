import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login_true" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
