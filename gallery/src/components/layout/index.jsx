import React from 'react';

const classes = {
  wrapper: 'p-8 relative xs:p-4',
  outerWrapper: 'relative',
};

const Layout = ({ children }) => {
  return (
    <div className={classes.outerWrapper}>
      <div className={classes.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
