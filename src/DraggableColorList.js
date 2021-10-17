import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';


const DraggableColorList = SortableContainer(({ newPaletteColors, removeColor }) => {
    return (
      <div style={{ height: "100%" }}>
        {newPaletteColors.map((color, i) => (
          <DraggableColorBox
            index={i}
            key={color.name}
            color={color.color}
            name={color.name}
            handleClick={() => removeColor(color.name)}
          />
        ))}
      </div>
    );
  });
  export default DraggableColorList;