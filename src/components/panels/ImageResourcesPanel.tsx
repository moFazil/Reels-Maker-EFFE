"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ImageResource } from "../entity/ImageResource";
import { UploadButton } from "../shared/UploadButton";
import { MdDeleteOutline } from "react-icons/md";


export const ImageResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    store.addImageResource(URL.createObjectURL(file));
  };
  
  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Add Image
      </div>
      {store.images.map((image, index) => (
        <div key={index} className="flex items-center">
          <ImageResource image={image} index={index} />
          <button
            onClick={(e) => {
              store.removeImageResource(index);
              store.refreshElements();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MdDeleteOutline className="text-[#EA2127] hover:text-xl text-lg" />
          </button>
        </div>
      ))}
      <UploadButton
        accept="image/*"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-center mx-2 py-2 px-4 rounded"
        onChange={handleFileChange}
      />
    </>
  );
});
