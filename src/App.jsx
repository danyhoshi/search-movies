import { useState, useRef, useEffect } from "react";
import Searcher from "./components/Searcher";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function App() {
  function useSearch() {
    //para sacar la logica del componente
    const isFirstRender = useRef(true);
    const [search, updateSearch] = useState("");
    const [error, setError] = useState(null);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = search === "";
        return;
      }
      if (search === "") {
        setError(" No se puede buscar una película vacía");
        return;
      }
      if (search.match(/^\d+$/)) {
        setError("No se puede buscar una película con sólo números");
        return;
      }
      if (search.length < 3) {
        setError("La búsqueda debe tener al menos 3 caracteres");
        return;
      }
      setError(null);
    }, [search]);
    return { search, updateSearch, error };
  }

  const { search, updateSearch, error } = useSearch(); // custome Hook

  const { movies, loading, getMovies } = useMovies(search);

  return (
    <>
      <Searcher
        search={search}
        error={error}
        updateSearch={updateSearch}
        getMovies={getMovies}
      />
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading ...</p>
      ) : (
        <Movies peliculas={movies} />
      )}
    </>
  );
}

export default App;
