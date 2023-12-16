"use client";
import React, { useState, useEffect } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";


type TextResourceProps = {
  fontSize: number;
  fontWeight: number;
  sampleText: string;
};
export const TextResource = observer(
  (({ fontSize, fontWeight, sampleText }: TextResourceProps)=> {
    const store = React.useContext(StoreContext);
    const [textColor, setTextColor] = React.useState("#76A99D");
    const handleColorChange = (color: any) => {
      // console.log("Color changed:", color.hex);
      setTextColor(color.hex);
    };
    const [selectedFont, setSelectedFont] = useState<string>('Arial'); 
    const predefinedFonts: string[] = ['Arial', 'Verdana', 'Georgia', 'Times New Roman'];

     const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedFont(event.target.value);
    };     

    return (
      <div className="items-center m-[15px] ">
        <div
          className="text-slate-800 flex justify-between"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
            color: textColor,
            fontFamily: selectedFont,
          }}
        >
          {sampleText}
        
        <button
          className="hover:bg-[#EA2127] bg-[rgba(0,0,0,.25)] rounded-full w-[28px] z-10 text-white font-bold px-0.5 py-0.5 my-1.5"
          onClick={() =>
            store.addText({
              text: sampleText,
              fontSize: fontSize,
              fontWeight: fontWeight,
              textColor: textColor,
              fontFamily: selectedFont,
              id:0
            })
          }
        >
          <MdAdd size="25" />
        </button>
        </div>
        <div>
        <input
          type="color"
          value={textColor}
          onChange={(e) => handleColorChange({ hex: e.target.value })}
        />
     <select value={selectedFont} onChange={handleFontChange}>
            <option value="">Select Font Family</option>
            {predefinedFonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

      </div>
      </div>
    );
  }
));
