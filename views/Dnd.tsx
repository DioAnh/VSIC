
import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

export function Draggable(props: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    border: isOver ? '2px dashed #4D96FF' : '2px dashed transparent',
    transition: 'border-color 0.2s ease-in-out',
  };

  return (
    <div ref={setNodeRef} style={style} className="p-2 rounded-lg">
      {props.children}
    </div>
  );
}
