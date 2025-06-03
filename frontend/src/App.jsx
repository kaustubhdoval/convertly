import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ConvertImages } from "./components/convertImages/convertImages";
import { MoreTools } from "./components/moreTools/moreTools";

import { ImageResizer } from "./pages/imageResizer";
import { YtToMp3 } from "./pages/ytToMp3";
import { YtToMp4 } from "./pages/ytToMp4";

function App() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<ConvertImages />} />
        <Route path="/image-resizer" element={<ImageResizer />} />
        <Route path="/yt-to-mp3" element={<YtToMp3 />} />
        <Route path="/yt-to-mp4" element={<YtToMp4 />} />
      </Routes>
      <MoreTools />
      <Footer />
    </Router>
  );
}

export default App;
