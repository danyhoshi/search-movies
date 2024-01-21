import withresult from "../mocks/with-result.json";
import withoutresult from "../mocks/without-result.json";
import { useState, useEffect } from "react";
export function userSearch() {
  //para sacar la logica del componente
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    if (search === "") {
      console.log("aqui");
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

function useMovies() {
  const peliculas = withresult.Search;
  console.log(peliculas.length);
  const mappedMovies = peliculas?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));
  return { mappedMovies };
}

export default useMovies;
