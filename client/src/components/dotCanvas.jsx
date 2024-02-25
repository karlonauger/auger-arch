import React, { useEffect } from 'react';

import canvas from './canvas';

function DotCanvas() {
  useEffect(() => {
    canvas();
  }, []);

  return (
    <div className="canvas">
      <canvas className="connecting-dots" style={{ display: 'block' }} />
    </div>
  );
}

export default DotCanvas;
