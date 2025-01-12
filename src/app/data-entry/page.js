'use client'

import React, { useState } from "react";
import { Container, Form, Button, Badge } from "react-bootstrap";
import PlayerFormGroup from "./components/PlayerFormGroup";
import WinnerFormGroup from "./components/WinnerFormGroup";
import BoardGameFormGroup from "./components/BoardGameFormGroup";

export default function DataEntry() {

    // State to store form inputs
    const [formData, setFormData] = useState({
        date: "",
        gameTitle: "",
        players: [],
        winners: [],
    });

    // Pre-determined player options
    const allPlayers = ["Liv Oomen", "Emily Oomen", "Sarah Klassen", "Noja Lajauskaitė", "Gisele Fox"];
    const allBoardGames = ["Bananagrams", "Miles Borne", "Yahtzee", "Nusht/Farkle", "The Game"]

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSetFormData = ( name, value ) => {
        setFormData({ ...formData, [name]: value });
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        addDataToDatabase()
        alert("Form submitted successfully!");
    };

    const addDataToDatabase = async () => {
        const response = await fetch("/api/addGame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: formData
            }),
        });
      
        const result = await response.json();
        if (response.ok) {
            console.log("Data added:", result);
        } else {
            console.error("Error:", result.error);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Game Details Form</h1>
            <Form onSubmit={handleSubmit}>
            
            {/* Date */}
            <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
    
            {/* Game Title */}
            <BoardGameFormGroup handleSetFormData={handleSetFormData} formData={formData} allBoardGames={allBoardGames} />
    
            {/* Players */}
            <PlayerFormGroup handleSetFormData={handleSetFormData} formData={formData} allPlayers={allPlayers} />
    
            {/* Winners */}
            <WinnerFormGroup  handleSetFormData={handleSetFormData} formData={formData} allPlayers={allPlayers} />
    
            {/* Submit Button */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </Container>
    )
}