import "./App.css";
import "./assets/styles/auth.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeartGraph from "./pages/heart/heart";
import Gallery from "./pages/gallery/gallery";   
import ToreParametre from "./pages/tore/tore"
import PageNotFound from "./pages/404/page404";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HeartGraph />} /> 
          <Route path="/gallery/" element={<Gallery />} />   
          <Route path="/tore/" element={<ToreParametre />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
