import { Link } from 'gatsby';
import React from 'react';

const classes = {
  wrapper: 'mb-6',
  name: 'font-semibold text-gray-900 pb-1',
  description: 'text-md text-gray-600 font-light',
};

const Event = ({ name }) => {
  return (
    <div className={classes.wrapper}>
      <h3>
        {name}
      </h3>
    </div>
  );
};

export default Event;
