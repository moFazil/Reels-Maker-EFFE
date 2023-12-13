"use client";
import React, { useEffect } from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;

  const handleDelete = (event: React.KeyboardEvent) => {
    if (event.key === "Delete" && store.selectedElement) {
      // Delete the selected timeline without asking for permission
      store.deleteEditorElement([store.selectedElement.id]);
      // Clear the selected element
      store.setSelectedElement(null);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" && store.selectedElement) {
      store.moveElementUp(store.selectedElement.id);
    } else if (event.key === "ArrowDown" && store.selectedElement) {
      store.moveElementDown(store.selectedElement.id);
    }
  };
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => handleKeyDown(event);
    const keyUpListener = (event: KeyboardEvent) => {
      // Handle key up event if needed
    };

    // Add event listeners when the component mounts
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);

    // Remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, [store.selectedElement, store.moveElementUp]);  

  return (
    <>
      <SeekPlayer />
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
