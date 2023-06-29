import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeList from "./pages/list/RecipeList";
import Recipe from "./pages/details/Recipe";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
          <Route path="/">
            <RecipeList />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
