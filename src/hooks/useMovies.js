import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/movies";
import { Linter } from "eslint";

export function useSearch() {
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

export function useMovies(search) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);
  console.log("search, prevSearch ", search, previusSearch);
  const getMovies = async () => {
    console.log("submit");
    if (search === previusSearch.current) {
      return;
    } // si el search actual es igual al search anterior, no hagas busqueda
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies(search);
      //  console.log(newMovies);
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  // const getSortedMovies = () => {
  //   // let moviesSorted = [...movies];
  //   const sortedMovies = movies;
  //   // Sorted.sort((a, b) => a.title.localCompare(b.title));
  //   console.log(
  //     "sortedmovies: ",
  //     sortedMovies,
  //     typeof sortedMovies[0].title,
  //     typeof movies
  //   );
  //   return sortedMovies;
  // };
  return { movies, loading, getMovies };
}
