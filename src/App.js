import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import '@shopify/polaris/build/esm/styles.css';


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
