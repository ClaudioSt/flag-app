// PlaybookPage.tsx
import { useParams, Link } from 'react-router-dom';

function PlaybookPage() {
  const { id } = useParams(); // Die Playbook-ID aus der URL holen
  // Beispielhafte Playbooks-Daten
  const playbooks = [
    { id: "3d0792cd-a5fe-4e39-99b6-f7e113a6afac", name: "Playbook 1", playersPerSide: 11 },
    { id: "e2e4ef1f-cd97-4f77-9c35-50fba28354ef", name: "Playbook 2", playersPerSide: 7 },
  ];

  const playbook = playbooks.find(pb => pb.id === id);

  if (!playbook) return <div>Playbook nicht gefunden!</div>;

  return (
    <div>
      <h1>{playbook.name}</h1>
      <p>Spieler pro Seite: {playbook.playersPerSide}</p>
      <Link to={`/app/playbook/${id}/plays/1`}>Zu den Plays</Link>
    </div>
  );
}

export default PlaybookPage;
