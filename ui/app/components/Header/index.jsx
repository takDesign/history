import React from 'react';
// import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
// import HeaderLink from './HeaderLink';
// import messages from './messages';

function Header() {
  return (
    <div>
      <NavBar>
        {/* <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink> */}
        <h1>Search Videos and Photos by Keywords or Geological Coordinate</h1>
      </NavBar>
    </div>
  );
}

export default Header;
