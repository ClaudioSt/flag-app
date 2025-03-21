// PlayPage.tsx
import { useParams } from 'react-router-dom';

function PlayPage() {
  const { id, playId } = useParams(); // ID des Playbooks und die Play ID aus der URL holen
  // Beispielhafte Play-Daten
  const plays = [
    { id: "a7cf8cf2-0b9f-467f-9770-e912095fe519", offense: true, player: ["Player1", "Player2"], route: "route1" },
    { id: "b3ff9cf2-1c9f-467f-9820-1b21eeff593d", offense: false, player: ["Player3", "Player4"], route: "route2" }
  ];

  const play = plays.find(p => p.id === playId);

  if (!play) return <div>Play nicht gefunden!</div>;

  return (
    <div>
      <h1>{play.offense ? "Offensive Play" : "Defensive Play"}</h1>
      <p>Spieler: {play.player.join(", ")}</p>
      <p>Route: {play.route}</p>
    </div>
  );
}

export default PlayPage;
