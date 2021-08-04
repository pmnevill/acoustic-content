/** @jsxImportSource @emotion/react */
import * as colors from "../styles/colors";
import { Button } from "carbon-components-react";

function ErrorMessage({ error, retry, ...props }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        display: "flex",
        justifyContent: "center",
      }}
      {...props}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span>There was an error: </span>
          <pre css={{ whiteSpace: "break-spaces", margin: "0" }}>
            {error.message}
          </pre>
        </div>
        {retry && typeof retry === "function" && (
          <Button
            css={{ marginTop: "20px" }}
            onClick={() => retry()}
            kind="danger--tertiary"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function ErrorFallback({ error }) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

export { FullPageErrorFallback, ErrorFallback, ErrorMessage };
