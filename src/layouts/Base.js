import React from 'react';
import Navbar from '../components/Navbar';

export const BaseLayout = ({ children, ...props }) => {
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

// Higher Order Component, ie `export default withBaseLayout(Home, { propsToDrillToNavbar })`
export const withBaseLayout = (Component, config) => (props) => {
  const viewName = getDisplayName(Component);
  return (
    <>
      <Navbar {...config} view={viewName} />
      <Component {...props} />
    </>
  );
};
