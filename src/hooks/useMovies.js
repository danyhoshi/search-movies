import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/movies";

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

export function useMovies(search, sort) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);
  console.log("sort", sort);
  const getMovies = async () => {
    if (search === previusSearch.current) {
      return;
    } // si el search actual es igual al search anterior, no hagas busqueda
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies(search);
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const getSortedMovies = () => {
    const sortedMovies = sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
    return sortedMovies;
  };
  return { movies: getSortedMovies(), loading, getMovies };
}
