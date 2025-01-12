

export default function GamesList({ gameData, selectedGame }) {

    const arrayToText = (array) => array.map((word) => ` ${word}`)

    const gameElems = gameData
    .filter((game) => game.gameTitle === selectedGame)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((game, index) => {
        return (
            <li key={index} className="list-group-item">
                <div className="fst-italic">{game.date} {game.gameTitle}</div>
                <div>{(game.winners.length > 1 ? "Winners: " : "Winner: ") + arrayToText(game.winners)}</div>
                <div>Players: {"" + arrayToText(game.players)}</div>
            </li>
        )
    })

    return <ul className="list-group list-group-flush">{gameElems}</ul>
}