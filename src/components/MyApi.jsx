import { useState, useEffect } from "react";
import Buscador from "./Buscador";

// eslint-disable-next-line react/prop-types
function NavPage({ page, setPage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
  
      <button
        className="btn btn-primary btn-sm"
        disabled = { setPage === 0}
        onClick={() => setPage(page - 1)}
        
      >
        PREVIOUS
      </button>
      
      <button
        className="btn btn-primary btn-sm"
        disabled = { setPage === 42}
        onClick={() => setPage(page + 1)}
      >
        NEXT
      </button>
    </header>
  );
}

export function MyApi() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const { results } = await data.json();
      setCharacters(results);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className=" card react col-md-4 g-1" key={character.id}>
              <Buscador
                key={character.id}
                name={character.name}
                origin={character.origin}
                image={character.image}
              />
            </div>
          ))}
        </div>
      )}

      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default MyApi;