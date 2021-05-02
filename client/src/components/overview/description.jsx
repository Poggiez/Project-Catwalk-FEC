/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Description = (props) => {
  const [{ item }] = useState(props);
  return (
    <div id="descrip">
      <div className="row">
        <div className="col-7 left">
          <p>{item.description}</p>
        </div>
        <div className="col-5 right">
          <p>{item.slogan}</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
