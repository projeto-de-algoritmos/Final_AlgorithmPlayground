import React from 'react';

const discColours = [
  'gray',
  'red',
  'green',
  'cyan',
  'yellow',
  'orange',
  'magenta',
  'blue',
];

const Disc = ({ size, topDisc, startDrag }) => {
  const discWidth = (size + 1.5) * 25;
  const discStyle = {
    width: discWidth + 'px',
    backgroundColor: discColours[size % 8],
  };

  return (
    <div
      className='disc'
      style={discStyle}
      draggable={topDisc}
      onDragStart={startDrag}
    >
      <span className='disc-label'>
        {size}
      </span>
    </div>
  );
}

export default Disc;