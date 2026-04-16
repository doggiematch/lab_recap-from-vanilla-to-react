import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      setUsers((prev) => [...prev, ...data.users]);
      setSkip((prev) => prev + limit);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>User Profiles</h1>
      <div className="user-list-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.firstName} />
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
        ))}
      </div>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Cargando más..." : "Load More"}
      </button>
    </>
  );
}

export default App;
