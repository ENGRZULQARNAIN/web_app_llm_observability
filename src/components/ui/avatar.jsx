import React from "react";

export function Avatar({ src, alt, className = "" }) {
  return (
    <div className={`w-10 h-10 rounded-full overflow-hidden ${className}`}>
      <img
        src={src || "/default-avatar.png"}
        alt={alt || "User avatar"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function AvatarFallback({ initials = "?", className = "" }) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold ${className}`}
    >
      {initials}
    </div>
  );
}

export function AvatarImage({ src, alt, className = "" }) {
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />;
}