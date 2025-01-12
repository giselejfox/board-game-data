'use client'

import { useEffect, useState } from "react";

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
    <div>
      {gameData.map((game, index) => <div key={index}>{game.date}</div>)}
    </div>
  );
}
