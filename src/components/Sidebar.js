import { useEffect, useState } from "react"

export default function Sidebar({ gameData, selectedGame, handleSetSelectedGame }) {
    const [games, setGames] = useState([])

    useEffect(() => {
        const gameNames = gameData.map(game => game.gameTitle);
        setGames([...new Set(gameNames)])
    }, [gameData])

    const radioElems = games.map((game, index) => {
        return (
            <div key={index} className="mb-1">
                <input
                    className="custom-radio"
                    type="radio"
                    id={`source-${index}`}  // Unique id for each radio button
                    name="game"       // All radio buttons in the group should share the same name
                    value={game}          // The value represents the source selected
                    checked={selectedGame === game}  // Check if the current source is selected
                    onChange={handleSetSelectedGame}   // Update state on selection change
                />
                <label className="ms-2" htmlFor={`source-${index}`}>{game}</label>
            </div>
        )
    })

    return (
        <div className="d-flex flex-column">
            {/* {JSON.stringify(games)} */}
            {radioElems}
        </div>
    )
}