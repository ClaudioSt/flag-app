import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TeamsPage() {


    interface Team {
        _id: string;
        name: string;
        abbreviation: string;
        color: string;
        logo: string;
    }
    // Zustand für Teams und das Formular
    const [teams, setTeams] = useState<Team[]>([]);
    const [newTeam, setNewTeam] = useState({ name: "", abbreviation: "", color: "", logo: "" });

    // Funktion, um alle Teams vom Backend zu holen
    const fetchTeams = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/teams");
            setTeams(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Teams:", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const addTeam = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/teams", newTeam);

            // Überprüfen, ob response.data ein Team-Objekt ist
            console.log(response.data);  // Hier kannst du sehen, was zurückgegeben wird

            // Das neue Team in die Liste der Teams hinzufügen
            setTeams((prevTeams) => [...prevTeams, response.data]);

            // Formular zurücksetzen
            setNewTeam({ name: "", abbreviation: "", color: "", logo: "" });
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Teams:", error);
        }
    };


    return (
        <div>
            <h1>Teams</h1>

            {/* Anzeige der Teams */}
            <ul>
                {teams.map((team) => (
                    <li key={team._id}>
                        <Link to={`/app/playbook/${team._id}`}>
                            <h2>{team.name}</h2>
                            <p>Kürzel: {team.abbreviation}</p>
                            <p>Farbe: {team.color}</p>
                            <img src={team.logo} alt={`${team.name} Logo`} width="50" />
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Formular zum Hinzufügen eines neuen Teams */}
            <h2>Neues Team hinzufügen</h2>
            <form onSubmit={addTeam}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Kürzel"
                    value={newTeam.abbreviation}
                    onChange={(e) => setNewTeam({ ...newTeam, abbreviation: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Farbe"
                    value={newTeam.color}
                    onChange={(e) => setNewTeam({ ...newTeam, color: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Logo URL"
                    value={newTeam.logo}
                    onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                    required
                />
                <button type="submit">Team hinzufügen</button>
            </form>
        </div>
    );
}

export default TeamsPage;
