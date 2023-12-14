"use client";
import React, { useEffect,useState } from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";
import useKeyPress from "@/hooks/UseKeyPress";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;
  const [forceRender, setForceRender] = useState(0);

  const handleDelete = (event: React.KeyboardEvent) => {
    if (event.key === "Delete" && store.selectedElement) {
      // Delete the selected timeline without asking for permission
      store.deleteEditorElement([store.selectedElement.id]);
      // Clear the selected element
      store.setSelectedElement(null);
    }
  };  

  const handleUndo = () => {
    store.undo();
    // Incrementing the state to force a re-render
    setForceRender((prev) => prev + 1);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" && store.selectedElement) {
      store.moveElementUp(store.selectedElement.id);
    } else if (event.key === "ArrowDown" && store.selectedElement) {
      store.moveElementDown(store.selectedElement.id);
    } else if ((event.ctrlKey || event.metaKey) && event.key === "z") {
      // Check for Ctrl + Z (Windows/Linux) or Command + Z (Mac)
      store.undo();
      // Incrementing the state to force a re-render
      setForceRender((prev) => prev + 1);
    } else if ((event.key === 'Delete' || event.code === 'Delete') && store.selectedElement) {
      // Delete the selected timeline without asking for permission
      store.deleteEditorElement([store.selectedElement.id]);
      // Clear the selected element
      store.setSelectedElement(null);
    }
  };  

  useKeyPress(handleKeyDown, 'ArrowUp');
  useKeyPress(handleKeyDown, 'ArrowDown');
  useKeyPress((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      handleKeyDown(event);
    }
  }, 'z');
  useKeyPress(handleKeyDown, 'Delete');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event);
    
    // Ensure focus is on the document for global key events
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <SeekPlayer />
      <button onClick={handleUndo}>Undo</button>
      <div className="relative height-auto"
       onKeyDown={handleDelete}
       tabIndex={0}
      >
        <div
          className="w-[2px] bg-red-400 absolute top-0 bottom-0 z-20"
          style={{
            left: `${percentOfCurrentTime}%`,
          }}
        ></div>
        {store.editorElements.map((element) => {
          return <TimeFrameView key={element.id} element={element} />;
        })}
      </div>
    </>
  );
});
