import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./pages/list/RecipeList";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <RecipeList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
