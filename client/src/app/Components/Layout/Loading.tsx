import React from "react";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen min-w-screen fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="flex space-x-1 items-center justify-center">
          <span className="animate-blink text-2xl font-bold rounded-full">
            .
          </span>
          <span className="animate-blink animation-delay-200 text-2xl font-bold rounded-full">
            .
          </span>
          <span className="animate-blink animation-delay-400 text-2xl font-bold rounded-full">
            .
          </span>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%,
          20%,
          50%,
          80%,
          100% {
            opacity: 1;
          }
          40%,
          60% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1.4s infinite both;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
}
