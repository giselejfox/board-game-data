'use client'
import { useState } from "react";
import { Form, Badge } from "react-bootstrap";

export default function PlayerFormGroup({ handleSetFormData, formData, allPlayers }) {

    // State for player input and dropdown
    const [playerInput, setPlayerInput] = useState("");
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    // Handle player input changes
    const handlePlayerInputChange = (e) => {
        const value = e.target.value;
        setPlayerInput(value);

        // Filter players that match the input
        if (value) {
            const filtered = allPlayers.filter((player) =>
                player.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPlayers(filtered);
        } else {
            setFilteredPlayers([]);
        }
    };

    // Handle pressing "Enter" in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addPlayer(); // Add the current input as a player
        }
    };

    // Add a player to the selected list
    const addPlayer = ( fullPlayer ) => {
        const player = fullPlayer ? fullPlayer : playerInput.trim();
        if (player && !formData.players.includes(player)) {
            handleSetFormData("players", [...formData.players, player])
        }
        setPlayerInput(""); // Clear input
        setFilteredPlayers([]); // Clear suggestions
    };

    // Remove a player from the selected list
    const removePlayer = (player) => {
        handleSetFormData("players", formData.players.filter((p) => p !== player))
    };

    const dropdownMenu = () => {
        const filteredPlayersElems = filteredPlayers.map((player, index) => (
            <div
                key={index}
                className="dropdown-item"
                onClick={() => addPlayer(player)}
                style={{ cursor: "pointer" }}
            >
                {player}
            </div>
        ))
        return (
            <div className="dropdown-menu show" style={{ display: "block" }}>
                {filteredPlayersElems}
            </div>
        )
    }

    const playerBadges = formData.players.map((player, index) => {
        return (
            <Badge
                key={index}
                pill
                bg="primary"
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => removePlayer(player)}
            >
                {player} &times;
            </Badge>
        )
    })

    return (
        <>
        {/* Players */}
        <Form.Group className="mb-3" controlId="formPlayers">
            <Form.Label>Players of the Game</Form.Label>
            <Form.Control
                type="text"
                placeholder="Start typing to search for players"
                value={playerInput}
                onChange={handlePlayerInputChange}
                onKeyDown={handleKeyPress} // Add new player on Enter
            />
            {/* Dropdown for suggestions */}
            {filteredPlayers.length > 0 && dropdownMenu()}
            {/* Selected players */}
            <div className="mt-2">{playerBadges}</div>
        </Form.Group>            
        </>
    )
}