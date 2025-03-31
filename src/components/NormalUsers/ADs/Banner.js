"use client"; // Ensures this component runs on the client side

import { useEffect } from "react";

export default function Banner() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Banner component mounted"); // Debugging

      // Load Ad script dynamically
      const adScript = document.createElement("script");
      adScript.src = "//www.highperformanceformat.com/89e098fec6148/invoke.js"; // Replace with actual ad script URL
      adScript.async = true;
      document.body.appendChild(adScript);

      // Inject Ad Code Manually
      const adContainer = document.getElementById("ad-container");
      if (adContainer) {
        adContainer.innerHTML = `
         <script type='text/javascript' src='//pl22110235.effectiveratecpm.com/93/b2/9b/93b29b7460482f8ee940e365978a1250.js'></script>
        `;
      } else {
        console.error("Ad container not found!");
      }
    }
  }, []);

  return <div id="ad-container" className="h-40 bg-gray-200 text-center"></div>;
}
