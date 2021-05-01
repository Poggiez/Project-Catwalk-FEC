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
