import "./App.css";
import Users from "./components/Users";
import { Albums } from "./components/Albums";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/albums">
            <Albums></Albums>
          </Route>
          <Route path="/">
            <Users></Users>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
