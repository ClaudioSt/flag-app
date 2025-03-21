// HomePage.tsx
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Willkommen zur Football App!</h1>
      <Link to="/app/teams">Zu den Teams</Link>
    </div>
  );
}

export default HomePage;
