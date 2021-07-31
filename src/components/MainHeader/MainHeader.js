import React from 'react';
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
} from 'carbon-components-react';
import { Link } from 'react-router-dom';

const MainHeader = () => (
  <Header aria-label="Acoustic Content">
    <HeaderName element={Link} to="/" prefix="Acoustic">
      Content
    </HeaderName>
    <HeaderGlobalBar>
    </HeaderGlobalBar>
  </Header>
);

export {MainHeader}