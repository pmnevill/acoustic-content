/** @jsxImportSource @emotion/react */
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function MainHeader() {
  const goTo = (url) => {
    window.location.href = url;
  };

  return (
    <Header aria-label="Acoustic Content">
      <HeaderName element={Link} to="/" prefix="Acoustic">
        Content
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="GitHub Repo"
          onClick={() => goTo("https://github.com/pmnevill/acoustic-content")}
        >
          <FaGithub css={{
            fontSize: '30px',
          }} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}

export { MainHeader };
