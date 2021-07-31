import "./App.scss";
import { Content } from "carbon-components-react";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { Switch, Route, Redirect } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Discover } from "./screens/Discover";
import { DocumentScreen } from "./screens/Document";
import { FullPageErrorFallback, ErrorFallback } from "./components/lib";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <MainHeader />
      <Content>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Switch>
            <Route exact path="/discover">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Discover />
              </ErrorBoundary>
            </Route>
            <Route path="/document/:documentId">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DocumentScreen />
              </ErrorBoundary>
            </Route>
            <Redirect to="/discover" />
          </Switch>
        </ErrorBoundary>
      </Content>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
