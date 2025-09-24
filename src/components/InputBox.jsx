import React from "react";

export default function InputBox({ value, onChange, modifier }) {
  const cls = "text-black border border-solid border-slate-300 text-center"
  return (
    <input
      className={cls + " " + modifier.trim()}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type something..."
    />
  );
}
