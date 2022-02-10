import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import MMNavbar from "../components/MMNavbar/MMNavbar";
import Home from "../components/Home/Home";
import EnterMovie from "../components/EnterMovie/EnterMovie";
import MovieList from "../components/MovieList/MovieList";
import axios from "axios";

function App() {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("uid") !== null) {
      localStorage.setItem("uid", params.get("uid"));
    }
    if (!localStorage.getItem("uid")) {
      setUnauth(true);
      setLoading(false);
    }
    else {
      axios.post("/api/login/checkuser", {
        uid: localStorage.getItem("uid"),
      }).then((res) => {
        if (res.data === true) {
          setUid(localStorage.getItem("uid"));
          setUnauth(false);
          setLoading(false);
        }
        else {
          setUnauth(true);
          setLoading(false);
        }
      }).catch((err) => {
        console.log("Error checking uid", err.response);
        setUnauth(true);
        setLoading(false);
      });
    }
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
              <Route path="/" element={<Home uid={uid} />} />
              <Route path="/entermovie" element={<EnterMovie uid={uid} />} />
              <Route path="/movielist" element={<MovieList uid={uid} />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
