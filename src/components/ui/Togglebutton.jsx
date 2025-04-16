import { useState } from 'react';

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
    <button
      onClick={() => setIsOn(!isOn)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        isOn ? 'bg-purple-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? 'translate-x-6' : ''
        }`}
      ></span>
    </button>
    </>
  );
}
