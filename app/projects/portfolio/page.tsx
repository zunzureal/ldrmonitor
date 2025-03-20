"use client"

import { useEffect } from "react";

export default function ProfolioPage() {
  useEffect(() => {
    // Create a link element
    const link = document.createElement("a");
    // Set the href to the PDF file
    link.href = "/Punyapat_Chanthakhun_Portfolio.pdf";
    // Set the download attribute to the desired file name
    link.download = "Punyapat_Chanthakhun_Portfolio.pdf";
    // Append the link to the body
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Remove the link from the document
    document.body.removeChild(link);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Downloading Portfolio PDF...</h1>
    </div>
  );
}