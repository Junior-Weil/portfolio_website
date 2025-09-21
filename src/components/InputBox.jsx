import React from "react";

export default function InputBox({ value, onChange }) {
  return (
    <input
      className="text-black border border-solid border-slate-300 text-center"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type something..."
    />
  );
}
