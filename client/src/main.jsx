import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import "./index.css";

// Set to false when you are ready to launch
const COMING_SOON = true;

// Visit yoursite.com/?preview=1 once to view the real site (remembered for that browser tab)
const params = new URLSearchParams(window.location.search);
if (params.get("preview") === "1") sessionStorage.setItem("preview", "1");
const isPreview = sessionStorage.getItem("preview") === "1";

const showComingSoon = COMING_SOON && !isPreview;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>{showComingSoon ? <ComingSoon /> : <App />}</BrowserRouter>
  </StrictMode>
);