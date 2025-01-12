'use client'
import { useState } from "react";
import { Form, Badge } from "react-bootstrap";

export default function BoardGameFormGroup({ handleSetFormData, formData, allBoardGames }) {

    // State for boardGame input and dropdown
    const [boardGameInput, setBoardGameInput] = useState("");
    const [filteredBoardGames, setFilteredBoardGames] = useState([]);

    // Handle boardGame input changes
    const handleBoardGameInputChange = (e) => {
        const value = e.target.value;
        setBoardGameInput(value);

        // Filter boardGames that match the input
        if (value) {
            const filtered = allBoardGames.filter((boardGame) =>
                boardGame.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBoardGames(filtered);
        } else {
            setFilteredBoardGames([]);
        }
    };

    // Handle pressing "Enter" in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setBoardGame(); // Add the current input as a boardGame
        }
    };

    // Add or replace the boardGame in the formData
    const setBoardGame = (fullBoardGame) => {
        // We will get a full name if we click on the dropdown and will pull from the text entry otherwise
        const boardGame = fullBoardGame ? fullBoardGame : boardGameInput.trim();
        handleSetFormData("gameTitle", boardGame);
        setBoardGameInput(""); // Clear input
        setFilteredBoardGames([]); // Clear suggestions
    };

    // Remove the board game from the formData
    const removeBoardGame = () => {
        handleSetFormData("gameTitle", ""); // Clear the board game
    };

    const dropdownMenu = () => {
        const filteredBoardGamesElems = filteredBoardGames.map((boardGame, index) => (
            <div
                key={index}
                className="dropdown-item"
                onClick={() => setBoardGame(boardGame)}
                style={{ cursor: "pointer" }}
            >
                {boardGame}
            </div>
        ))
        return (
            <div className="dropdown-menu show" style={{ display: "block" }}>
                {filteredBoardGamesElems}
            </div>
        )
    }

    const boardGameBadge = () => {
        return (
            <>
            {formData.gameTitle !== "" && 
                <Badge
                    bg="dark"
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeBoardGame()}
                >
                    {formData.gameTitle} &times;
                </Badge>
            }
            </>
        )
    }

    return (
        <>
        {/* BoardGames */}
        <Form.Group className="mb-3" controlId="formBoardGames">
            <Form.Label>Game Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Start typing to search for games"
                value={boardGameInput}
                onChange={handleBoardGameInputChange}
                onKeyDown={handleKeyPress} // Add new boardGame on Enter
            />
            {/* Dropdown for suggestions */}
            {filteredBoardGames.length > 0 && dropdownMenu()}
            {/* Selected boardGames */}
            <div className="mt-2">{boardGameBadge()}</div>
        </Form.Group>            
        </>
    )
}