"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import {
  MdDownload,
  MdVideoLibrary,
  MdImage,
  MdTransform,
  MdTitle,
  MdAudiotrack,
  MdOutlineFormatColorFill,
  MdMovieFilter,
  MdOutlineCreateNewFolder, 
} from "react-icons/md";
import { Store } from "@/store/Store";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);
  const handleClearLocalStorage = () => {
    store.clearLocalStorage();
};

  return (
    <>
      {MENU_OPTIONS.map((option) => {
        return (
          <button
            key={option.name}
            onClick={() => option.action(store)}
            className="py-4 px-0 w-full flex flex-col items-center text-xs"
          >
            <option.icon
              className=""
              size="20"
              color={
                store.selectedMenuOption === option.name ? "#EA2127" : "gray"
              }
            />
            <div
              className={
                store.selectedMenuOption === option.name
                  ? "font-semibold"
                  : "font-light"
              }
            >
              {option.name}
            </div>
          </button>
        );
      })}
      <button
        onClick={() => {
          handleClearLocalStorage();
          store.setSelectedMenuOption("NewEdit");
        }}
        className="py-4 px-0 w-full flex flex-col items-center text-xs"
      >
        <MdOutlineCreateNewFolder
          className=""
          size="20"
          color={
            store.selectedMenuOption === "NewEdit" ? "#EA2127" : "gray"
          }
        />
        <div
          className={
            store.selectedMenuOption === "NewEdit"
              ? "font-semibold"
              : "font-light"
          }
        >
          New
        </div>
      </button>
    </>
  );
});

const MENU_OPTIONS = [
  {
    name: "Video",
    icon: MdVideoLibrary,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
  },
  {
    name: "Audio",
    icon: MdAudiotrack,
    action: (store: Store) => {
      store.setSelectedMenuOption("Audio");
    },
  },
  {
    name: "Image",
    icon: MdImage,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
  },
  {
    name: "Text",
    icon: MdTitle,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    name: "Animation",
    icon: MdTransform,
    action: (store: Store) => {
      store.setSelectedMenuOption("Animation");
    },
  },
  {
    name: "Effects",
    icon: MdMovieFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("Effect");
    },
  },
  {
    name: "Fill",
    icon: MdOutlineFormatColorFill,
    action: (store: Store) => {
      store.setSelectedMenuOption("Fill");
    },
  },
  {
    name: "Export",
    icon: MdDownload,
    action: (store: Store) => {
      store.setSelectedMenuOption("Export");
    },
  },
];
