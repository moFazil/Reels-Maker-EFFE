"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
  const store = React.useContext(StoreContext);
  return (

    <div className=" overflow-y-auto max-h-full">
      <div className="flex flex-row justify-between">
        <div className="text-xl px-9 pt-5 font-semibold">Elements</div>

      </div>
      <div className="flex flex-col px-5 pt-2">
        {store.editorElements.map((element) => {
          return <Element key={element.id} element={element} />;
        })}
      </div>
    </div>
  );
});