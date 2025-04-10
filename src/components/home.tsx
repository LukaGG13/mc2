import React from "react";
import { Link } from "react-router-dom";


interface ButtonProps {
  text: string;
  onClick: () => void;
}

const NavigationButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {text}
    </button>
  );
};

const HomeComponent: React.FC = () => {
  const handleStartGame = () => {
    console.log("Start game clicked");

    // Navigation logic here
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Navigation logic here
  };

  const handleTournament = () => {
    console.log("Tournament clicked");
    // Navigation logic here
  };

  return (
    <div className="home-container">
      <h1>Card Game</h1>
      <div className="button-container">
        <Link to={"/start-game"}>
            <NavigationButton text="Start Game" onClick={handleStartGame} />
        </Link>
        <NavigationButton text="Settings" onClick={handleSettings} />
        <NavigationButton text="Tournament" onClick={handleTournament} />
      </div>
    </div>
  );
};

export default HomeComponent;