import { Route } from "react-router-dom";
import BreedCreate from "./components/BreedCreate";
import Details from "./components/Details";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/create" component={BreedCreate} />
      <Route path="/details/:id" component={Details} />
    </div>
  );
}

export default App;
