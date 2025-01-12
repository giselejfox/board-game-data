'use client'

import React, { useState } from "react";
import { Container, Form, Button, Badge } from "react-bootstrap";
import PlayerFormGroup from "./components/playerFormGroup";

export default function DataEntry() {

    // State to store form inputs
    const [formData, setFormData] = useState({
        date: "",
        name: "",
        gameTitle: "",
        players: [],
        winners: [],
    });

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
        console.log("Form Data Submitted:", formData);
        alert("Form submitted successfully!");
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
            <Form.Group className="mb-3" controlId="formGameTitle">
                <Form.Label>Title of the Game</Form.Label>
                <Form.Control
                type="text"
                name="gameTitle"
                placeholder="Enter the title of the game"
                value={formData.gameTitle}
                onChange={handleChange}
                required
                />
            </Form.Group>
    
            {/* Players */}
            <PlayerFormGroup handleSetFormData={handleSetFormData} formData={formData} />
    
            {/* Winners */}
            <Form.Group className="mb-3" controlId="formWinners">
                <Form.Label>Winners of the Game</Form.Label>
                <Form.Control
                type="text"
                name="winners"
                placeholder="List the winners, separated by commas"
                value={formData.winners}
                onChange={handleChange}
                required
                />
            </Form.Group>
    
            {/* Submit Button */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </Container>
    )
}