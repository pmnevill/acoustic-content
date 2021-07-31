import "./App.scss";
import { Content, Header } from "carbon-components-react";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { Switch, Route, Redirect } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Discover } from "./screens/Discover";
import { DocumentScreen } from "./screens/Document";
import { FullPageErrorFallback, ErrorFallback } from "./components/lib";

function App() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <MainHeader />
      <Content>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Switch>
            <Route exact path="/discover">
              <Discover />
            </Route>
            <Route path="/document/:documentId">
              <DocumentScreen />
            </Route>
            <Redirect to="/discover" />
          </Switch>
        </ErrorBoundary>
      </Content>
    </ErrorBoundary>
  );
}

export default App;
