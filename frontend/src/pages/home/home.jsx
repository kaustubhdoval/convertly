import "./home.css";
import DarkVeil from "./DarkVeil";
import { Search } from "lucide-react";

export const Home = () => {
  return (
    <div className="home">
      <div className="textContainer">
        <h2 className="hero-title">You're in the Right Place.</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a tool"
            className="search-input"
          />
          <button className="search-button">
            <Search />
          </button>
        </div>
      </div>
      <div className="drkContainer">
        <DarkVeil />
      </div>
    </div>
  );
};
