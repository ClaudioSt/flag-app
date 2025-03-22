import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PlaybookPage() {

    interface Playbook {
        _id: string;
        teamId: string;
        name: string;
        playersPerSide: number;
    }

    const { id } = useParams(); // Hier ist id = teamId
    const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
    const [newPlaybook, setNewPlaybook] = useState({ name: '', playersPerSide: 5 });


    // Playbooks vom Backend holen
    const fetchPlaybooks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/playbooks/${id}`);
            setPlaybooks(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Playbooks:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPlaybooks();
        }
    }, [id]);

    const addPlaybook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/teams/${id}/playbooks/`, newPlaybook);
            setPlaybooks(prev => [...prev, response.data]);
            setNewPlaybook({ name: '', playersPerSide: 5 });
        } catch (error) {
            console.error('Fehler beim Hinzufügen:', error);
        }
    };

    return (
        <div>
            <h1>Playbooks für Team {id}</h1>

            {/* Playbook-Liste */}
            <ul>
                {playbooks.map((pb: any) => (
                    <li key={pb._id}>
                        <h2>{pb.name}</h2>
                        <p>Spieler pro Seite: {pb.playersPerSide}</p>
                        <Link to={`/app/playbook/${id}/plays/${pb._id}`}>Zu den Plays</Link>
                    </li>
                ))}
            </ul>

            {/* Neues Playbook hinzufügen */}
            <h2>Neues Playbook hinzufügen</h2>
            <form onSubmit={addPlaybook}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPlaybook.name}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Spieler pro Seite"
                    value={newPlaybook.playersPerSide}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, playersPerSide: parseInt(e.target.value) })}
                    required
                />
                <button type="submit">Playbook hinzufügen</button>
            </form>
        </div>
    );
}

export default PlaybookPage;
