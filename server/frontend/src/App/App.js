import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MMNavbar from "../components/MMNavbar/MMNavbar";
import Home from "../components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MMNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
