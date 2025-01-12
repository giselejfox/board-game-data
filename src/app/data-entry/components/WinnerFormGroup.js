'use client'
import { useState } from "react";
import { Form, Badge } from "react-bootstrap";

export default function WinnerFormGroup({ handleSetFormData, formData, allPlayers }) {

    // State for winner input and dropdown
    const [winnerInput, setWinnerInput] = useState("");
    const [filteredWinners, setFilteredWinners] = useState([]);

    // Handle winner input changes
    const handleWinnerInputChange = (e) => {
        const value = e.target.value;
        setWinnerInput(value);

        // Filter winners that match the input
        if (value) {
            const filtered = allPlayers.filter((winner) =>
                winner.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredWinners(filtered);
        } else {
            setFilteredWinners([]);
        }
    };

    // Handle pressing "Enter" in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addWinner(); // Add the current input as a winner
        }
    };

    // Add a winner to the selected list
    const addWinner = ( fullWinner ) => {
        const winner = fullWinner ? fullWinner : winnerInput.trim();
        if (winner && !formData.winners.includes(winner)) {
            handleSetFormData("winners", [...formData.winners, winner])
        }
        setWinnerInput(""); // Clear input
        setFilteredWinners([]); // Clear suggestions
    };

    // Remove a winner from the selected list
    const removeWinner = (winner) => {
        handleSetFormData("winners", formData.winners.filter((p) => p !== winner))
    };

    const dropdownMenu = () => {
        const filteredWinnersElems = filteredWinners.map((winner, index) => (
            <div
                key={index}
                className="dropdown-item"
                onClick={() => addWinner(winner)}
                style={{ cursor: "pointer" }}
            >
                {winner}
            </div>
        ))
        return (
            <div className="dropdown-menu show" style={{ display: "block" }}>
                {filteredWinnersElems}
            </div>
        )
    }

    const winnerBadges = formData.winners.map((winner, index) => {
        return (
            <Badge
                key={index}
                pill
                bg="primary"
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeWinner(winner)}
            >
                {winner} &times;
            </Badge>
        )
    })

    return (
        <>
        {/* Winners */}
        <Form.Group className="mb-3" controlId="formWinners">
            <Form.Label>Winners of the Game</Form.Label>
            <Form.Control
                type="text"
                placeholder="Start typing to search for winners"
                value={winnerInput}
                onChange={handleWinnerInputChange}
                onKeyDown={handleKeyPress} // Add new winner on Enter
            />
            {/* Dropdown for suggestions */}
            {filteredWinners.length > 0 && dropdownMenu()}
            {/* Selected winners */}
            <div className="mt-2">{winnerBadges}</div>
        </Form.Group>            
        </>
    )
}