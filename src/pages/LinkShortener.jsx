import React, { useState } from "react";
import axios from "axios";

const LinkShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const API_TOKEN = "ddb35fd054ae68100934def32224868afabc2411";

  const handleShortenUrl = async () => {
    setError("");
    setShortenedUrl("");
    setCopied(false);

    if (!originalUrl) {
      setError("Please enter a URL to shorten.");
      return;
    }

    try {
      const response = await axios.get("https://earnlinks.in/api", {
        params: {
          api: API_TOKEN,
          url: originalUrl,
        },
      });

      if (response.data && response.data.status === "success") {
        setShortenedUrl(response.data.shortenedUrl);
      } else {
        setError("Failed to shorten the URL. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
        URL Shortener
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          onClick={handleShortenUrl}
          className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Shorten URL
        </button>
        {shortenedUrl && (
          <div className="mt-6">
            <p className="text-gray-700 font-medium mb-2">Shortened URL:</p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg border">
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium underline truncate"
              >
                {shortenedUrl}
              </a>
              <button
                onClick={handleCopy}
                className={`ml-2 p-2 text-xs rounded-lg ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkShortener;
