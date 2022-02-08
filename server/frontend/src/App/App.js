import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import MMNavbar from "../components/MMNavbar/MMNavbar";
import Home from "../components/Home/Home";
import EnterMovie from "../components/EnterMovie/EnterMovie";
import MovieList from "../components/MovieList/MovieList";

function App() {
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("uid") !== null) {
      localStorage.setItem("uid", params.get("uid"));
    }
    if (!localStorage.getItem("uid")) {
      setUnauth(true);
    }
    else {
      setUnauth(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    if (unauth) {
      return (
        <div>Unauthorized</div>
      );
    }
    else {
      return (
        <BrowserRouter>
          <div className="App">
            <MMNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/entermovie" element={<EnterMovie />} />
              <Route path="/movielist" element={<MovieList />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
