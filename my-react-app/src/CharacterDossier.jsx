import { useEffect, useState } from "react";

function CharacterDossier() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [isDead, setIsDead] = useState(false);

  const [searchId, setSearchId] = useState(1);

  // Fetch function
  async function fetchCharacter(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();

    setName(data.name);
    setStatus(data.status);
    setImage(data.image);
    setIsDead(data.status === "Dead");
  }

  // Fetch Rick Sanchez on first load
  useEffect(() => {
    fetchCharacter(1);
  }, []);

  // Toggle Alive/Dead manually
  function toggleStatus() {
    if (isDead) {
      setStatus("Alive");
      setIsDead(false);
    } else {
      setStatus("Dead");
      setIsDead(true);
    }
  }

  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: isDead ? "#ccc" : "#fff",
        textAlign: "center",
        margin: "20px auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          borderRadius: "10px",
          filter: isDead ? "grayscale(100%)" : "none"
        }}
      />

      <h2>{name}</h2>
      <p>Status: {status}</p>

      {/* Search Section */}
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter character ID"
        style={{ width: "100%", marginTop: "10px", padding: "8px" }}
      />

      <button
        onClick={() => fetchCharacter(searchId)}
        style={{ marginTop: "10px", width: "100%", padding: "10px" }}
      >
        Fetch Character
      </button>

      <button
        onClick={toggleStatus}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "black",
          color: "white"
        }}
      >
        Toggle Status
      </button>
    </div>
  );
}

export default CharacterDossier;
