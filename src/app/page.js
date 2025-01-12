'use client'

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TestBarChart from "../components/TestBarChart";

export default function Home() {

  const [gameData, setGameData] = useState([])

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
    <Container>
      <TestBarChart rawData={gameData}/>
    </Container>
  );
}
