'use client'

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TestBarChart from "../components/TestBarChart";
import Sidebar from "@/components/Sidebar";

export default function Home() {

  const [gameData, setGameData] = useState([])
  const [selectedGame, setSelectedGame] = useState("All")

  const handleSetSelectedGame = (e) => setSelectedGame(e.target.value)

  const fetchFirebaseData = async () => {
    try {
      const response = await fetch(`/api/getFirebaseData`);
      const data = await response.json();
      if (response.ok) {
          setGameData(Object.values(data.data));
      } else {
          console.error('Error fetching data:', data.message);
      }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchFirebaseData()
  }, [])

  return (
    <Container className="mt-4">
      {/* <div>{selectedGame}</div> */}
      <Row>
        <Col xs={2}>
          <Sidebar gameData={gameData} handleSetSelectedGame={handleSetSelectedGame} selectedGame={selectedGame} />
        </Col>
        <Col xs={10}>
          <TestBarChart rawData={gameData} gameTitle={selectedGame}/>
        </Col>
      </Row>
      <div>{JSON.stringify(gameData)}</div>
    </Container>
  );
}
