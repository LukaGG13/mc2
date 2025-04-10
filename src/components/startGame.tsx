import React from "react";
import { useState } from "react";
import Zvanje from "./zvanje";
import qrIcon from "../assets/qrIcon.svg";
import { Link } from "react-router-dom";

function StartGameComponent() {
    const [showQRCode, setShowQRCode] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState("");
    
    const people = [
        { name: "Player 1", qrValue: "player1-qr-data" },
        { name: "Player 2", qrValue: "player2-qr-data" },
        { name: "Player 3", qrValue: "player3-qr-data" },
        { name: "Player 4", qrValue: "player4-qr-data" }
    ];
    
    const handleQRClick = (personName:any) => {
        setSelectedPerson(personName);
        setShowQRCode(true);
    };
    
    const closeQROverlay = () => {
        setShowQRCode(false);
    };
    
    return (
        <>
            <table className="player-table">
                <tbody>
                    <tr>
                        <td>
                            <div className="player-cell">
                                <span>{people[0].name}</span>
                                <button onClick={() => handleQRClick(people[0].name)}>
                                    <img src={qrIcon} alt="QR Code" />
                                </button>
                            </div>
                        </td>
                        <td>
                            <div className="player-cell">
                                <span>{people[1].name}</span>
                                <button onClick={() => handleQRClick(people[1].name)}>
                                    <img src={qrIcon} alt="QR Code" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="player-cell">
                                <span>{people[2].name}</span>
                                <button onClick={() => handleQRClick(people[2].name)}>
                                    <img src={qrIcon} alt="QR Code" />
                                </button>
                            </div>
                        </td>
                        <td>
                            <div className="player-cell">
                                <span>{people[3].name}</span>
                                <button onClick={() => handleQRClick(people[3].name)}>
                                    <img src={qrIcon} alt="QR Code" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to={"/game"}> 
                <button> Start </button>
            </Link>
            {showQRCode && (
                <div className="qr-overlay" onClick={closeQROverlay}>
                    <div className="qr-modal">
                        <h2>{selectedPerson}'s QR Code</h2>
                        <div className="large-qr-code">
                            {/* Here you would render the actual QR code using a library */}
                            <img src={qrIcon} alt="QR Code" style={{ width: '250px', height: '250px' }} />
                        </div>
                        <button onClick={closeQROverlay}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
} 

export default StartGameComponent;