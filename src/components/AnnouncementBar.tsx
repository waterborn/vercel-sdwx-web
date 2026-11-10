"use client";

import { useEffect, useState } from "react";

/* ── Announcement bar — black strip with rotating messages ── */
const MESSAGES = [
  "OEM / ODM Customization — Low MOQ & 7-Day Prototyping",
  "Samples Available Upon Request · Global Express, Air & Sea Freight",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-black text-brand-white text-center py-2.5 px-4">
      <p
        key={index}
        className="text-xs md:text-sm tracking-[0.08em] fade-in visible"
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
