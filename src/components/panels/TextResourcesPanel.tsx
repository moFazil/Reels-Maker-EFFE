"use client";
import React from "react";
import { observer } from "mobx-react";
import { TextResource } from "../entity/TextResource";

export const TextResourcesPanel = observer(() => {
  return (
    <div className="h-full">
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold text-slate-800 ">
        Add Text
      </div>
      <TextResource sampleText="Title" fontSize={28} fontWeight={800} />
      <TextResource sampleText="Subtitle" fontSize={20} fontWeight={600} />
      <TextResource sampleText="Body" fontSize={16} fontWeight={400} />
      <TextResource sampleText="Caption" fontSize={14} fontWeight={300} />
    </div>
  );
});
