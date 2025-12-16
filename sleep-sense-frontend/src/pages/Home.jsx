import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Sleep Sense 💤</h1>
      <p>Understand and improve your sleep using AI</p>

      <Link to="/analyze">
        <button>Analyze My Sleep</button>
      </Link>

      <Link to="/dashboard">
        <button>View Dashboard</button>
      </Link>

      <Link to="/result">
        <button>View Results</button>
      </Link>
    </div>
  );
}

export default Home;
