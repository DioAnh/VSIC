
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface DndProps {
  id: string;
  children: React.ReactNode;
}

// FIX: Redefined Draggable as a React.FC to resolve JSX type inference issues,
// ensuring `children` and `key` props are handled correctly.
export const Draggable: React.FC<DndProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

// FIX: Redefined Droppable as a React.FC to resolve JSX type inference issues,
// ensuring the `children` prop is correctly typed.
export const Droppable: React.FC<DndProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    border: isOver ? '2px dashed #4D96FF' : '2px dashed transparent',
    transition: 'border-color 0.2s ease-in-out',
  };

  return (
    <div ref={setNodeRef} style={style} className="p-2 rounded-lg">
      {children}
    </div>
  );
};
