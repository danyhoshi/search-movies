import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  //USECALLBACK LO USAMOS PARA EXACTAMENTE LO MISMO QUE EL USEMEMO CUANDO ES UNA FUNCION LO QUE QUEREMOS PASAR PERO PASAND DIRECTAMENTE LA FUNCION, SIN TENER QUE HACER EL ()=>
  //PARA QUE GETMOVIES() SOLO SE EJECUTE CUANDO CAMBIA EL SEARCH, NO CUANDO ORDENA
  const getMovies = useCallback(async (search) => {
    console.log("getMovies");
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
  }, []);
  // USEMEMO TAMBIEN SIRVE PARA RETORNAR FUNCIONES
  // const getMovies = useMemo(() => {
  //   return async (search) => {
  //     console.log("getMovies");
  //     if (search === previusSearch.current) {
  //       return;
  //     } // si el search actual es igual al search anterior, no hagas busqueda
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       previusSearch.current = search;
  //       const newMovies = await searchMovies(search);
  //       setMovies(newMovies);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // }, []);

  //CON ESTA FORMA SE EJECUTA ESTA FUNCION CON CADA CAMBIO DEL SEARCH
  // const getSortedMovies = () => {
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies;
  //   return sortedMovies;
  // };
  // DE ESTA FORMA SE EJECUTA SOLO CUANDO CAMBIA LAS DEPENDENCAS MOVIES Y SORT
  //ASEGURATE QUE VERDADERAMENTE NECESITAS EL USEMEMO POR UN PROBLEMA DE RENDIMIENTO, NO USAR INDISCRIMINADAMENTE
  const sortedMovies = useMemo(() => {
    console.log("Memo sorted");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]); // va a ejecutar dependiendo de las depedencias, guarda el valor, tambien ejecuta funciones en funcion de las dependencias
  return { movies: sortedMovies, loading, getMovies };
}
