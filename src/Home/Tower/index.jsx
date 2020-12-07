import React from 'react';
import Disc from '../Disc';

const Tower = ({ towerDiscs, maxSize, startTopDiscDrag, dropDisc }) => {
  const towerStyle = { width: (maxSize + 3) * 24 };
  const pillarStyle = { height: 60 + maxSize * 20 };

  return (
    <div
      className='tower'
      style={towerStyle}
      onDragOver={(e) => { e.preventDefault() }}
      onDrop={dropDisc}
    >
      <div className='tower-pillar' style={pillarStyle} />
      <div className='tower-base' />
      <div className='disc-group'>
        {towerDiscs.map((size, i) =>
          <Disc
            key={size.toString()}
            size={size}
            topDisc={i === 0}
            startDrag={startTopDiscDrag}
          />
        )}
      </div>
    </div>
  );
};

export default Tower;