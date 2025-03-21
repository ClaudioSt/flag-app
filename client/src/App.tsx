import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [array, setArray] = useState([]);
  const [players, setPlayers] = useState<{ name: string; position: string }[]>([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.offense);
    console.log(response.data.offense)
  };

  // API-Daten für alle Spieler abrufen
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/players");
      setPlayers(response.data); // Spieler in den Zustand setzen
    } catch (error) {
      console.error("Fehler beim Abrufen der Spieler:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
    fetchPlayers();
  }, [])

  // Funktion, um einen neuen Spieler hinzuzufügen
  const addPlayer = async (e: React.FormEvent) => {
    e.preventDefault(); // Verhindern, dass das Formular die Seite neu lädt.

    try {
      const newPlayer = { name, position };
      const response = await axios.post("http://localhost:8080/api/players", newPlayer);
      console.log("Spieler hinzugefügt:", response.data);

      // Formular zurücksetzen
      setName("");
      setPosition("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Spielers:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline text-red-500">
          Spieler hinzufügen
        </h1>

        {/* Formular */}
        <form onSubmit={addPlayer}>
          <div>
            <label>Spielername:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name des Spielers"
              required
            />
          </div>

          <div>
            <label>Position:</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position des Spielers"
              required
            />
          </div>

          <button type="submit">Spieler hinzufügen</button>
        </form>
      </div>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      {array.map((offense, index) => (
        <div key={index}>
          <p>{offense}
          </p>
          <br>
          </br>

        </div>

      ))}
      <h2 className="text-xl mt-5">Alle Spieler:</h2>
      {players.length > 0 ? (
        players.map((player, index) => (
          <div key={index} className="player-item">
            <p><strong>Name:</strong> {player.name}</p>
            <p><strong>Position:</strong> {player.position}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>Keine Spieler vorhanden</p>
      )}
    </>
  )
}

export default App
