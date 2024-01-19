import React from "react";
import withresult from "../mocks/with-result.json";
import withoutresult from "../mocks/without-result.json";

export function Content({ peliculas }) {
  return (
    <main className="listMovies">
      <ul>
        {peliculas.map((p) => {
          return (
            <li key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.year}</p>
              <img src={p.poster} alt={p.title} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export function NoResult() {
  return <p>Not found movies for this search...</p>;
}

export function Movies({ peliculas }) {
  const hasMovies = withresult?.Search.length > 0;
  return hasMovies ? <Content peliculas={peliculas} /> : <NoResult />;
}
