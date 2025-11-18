"use client";

import React from "react";

export default function PricingSkeleton() {
  return (
    <section className="w-full px-4 py-16 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl p-8 border shadow animate-pulse bg-white"
          >
            {/* Top badge */}
            <div className="h-6 w-24 bg-gray-200 rounded-full mb-6"></div>

            {/* Price */}
            <div className="h-10 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-6"></div>

            {/* Title */}
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
