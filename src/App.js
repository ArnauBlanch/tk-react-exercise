import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import CreateEditRecipePage from "./pages/CreateEditRecipePage";

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
          <Route path="/recipes/new">
            <CreateEditRecipePage />
          </Route>
          <Route path="/recipes/:recipeId">
            <RecipePage />
          </Route>
          <Route path="/">
            <RecipeListPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
