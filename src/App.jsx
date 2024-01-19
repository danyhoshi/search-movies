import { useState } from "react";
import Searcher from "./components/Searcher";
import "./App.css";
import Content from "./components/Content";
import withresult from "./mocks/with-result.json";
import withoutresult from "./mocks/without-result.json";

function App() {
  const [count, setCount] = useState(0);
  const peliculas = withresult.Search;
  console.log(peliculas.length);
  return (
    <>
      <Searcher />
      <Content peliculas={peliculas} />
    </>
  );
}

export default App;
