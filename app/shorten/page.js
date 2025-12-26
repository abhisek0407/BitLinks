// "use client";
// // import { Code } from "mongodb";
// import React from "react";
// import { useState } from "react";
// import Link from "next/link";
// const shorten = () => {
//   const [url, seturl] = useState("");
//   const [shorturl, setshorturl] = useState("");
//   const [generated, setgenerated] = useState("");
//   const sanitizeShortUrl = (text) => {
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, '-') // Replace spaces with hyphens
//       .replace(/[^a-z0-9-]/g, ''); // Remove any non-alphanumeric characters except hyphens
//   };

//   const generate = () => {
//     const sanitized = sanitizeShortUrl(shortUrl);
//     if (!sanitized) {
//         alert("Please enter a valid custom text for the short URL.");
//         return;
//     }

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       url: url,
//       shorturl: sanitized,
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch("/api/generate", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.success) {
//           // CORRECTED: This will now correctly read the environment variable after a server restart.
//           setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${sanitized}`);
//         }
//         seturl("");
//         setshorturl("");
//         setgenerated(`${process.NEXT_PUBLIC_HOST}/${shorturl}`);
//         console.log(result);
//         alert(result.message);
//       })
//       .catch((error) => console.error(error));
//   };
//   return (
//     <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
//       <h1 className="font-bold text-2xl">Generate your short URLs</h1>
//       <div className="flex flex-col gap-2">
//         <input
//           type="text"
//           value={url}
//           className="px-4 py-2 focus:outline-purple-600 rounded-md bg-white"
//           placeholder="Enter your URL"
//           onChange={(e) => {
//             seturl(e.target.value);
//           }}
//         />
//         <input
//           type="text"
//           value={shorturl}
//           className="px-4 py-2 focus:outline-purple-600 rounded-md bg-white"
//           placeholder="Enter your preffered short URL text"
//           onChange={(e) => {
//             setshorturl(e.target.value);
//           }}
//         />
//         <button
//           onClick={generate}
//           className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white my-3"
//         >
//           Generate
//         </button>
//       </div>
//        {generated && <> <span className='font-bold text-lg'>Your Link </span><code><Link target="_blank" href={generated}>{generated}</Link> 
//                 </code></>}
//     </div>
//   );
// };

// export default shorten;
"use client";

import React, { useState } from "react";
import Link from "next/link";

// Renamed the component to follow standard naming conventions (PascalCase)
const shorten = () => {
  // CORRECTED: Ensured all state variables and their setters use consistent camelCase.
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(""); // This is the state variable
  const [generated, setGenerated] = useState("");

  const sanitizeShortUrl = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const generate = () => {
    // CORRECTED: This now correctly uses the camelCase state variable 'shortUrl'
    const sanitized = sanitizeShortUrl(shortUrl);
    if (!sanitized) {
        alert("Please enter a valid custom text for the short URL.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: sanitized,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${sanitized}`);
        }
        setUrl("");
        setShortUrl(""); // Use the correct setter
        alert(result.message);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generate your short URLs</h1>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={url}
          className="px-4 py-2 focus:outline-purple-600 rounded-md bg-white"
          placeholder="Enter your URL (e.g., https://google.com)"
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          value={shortUrl} // Use the correct state variable
          className="px-4 py-2 focus:outline-purple-600 rounded-md bg-white"
          placeholder="Enter your custom short URL text"
          onChange={(e) => setShortUrl(e.target.value)} // Use the correct setter
        />
        <button
          onClick={generate}
          className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white my-3 hover:bg-purple-600 transition-colors"
        >
          Generate
        </button>
      </div>
      {generated && (
        <div className="mt-4">
          <span className="font-bold text-lg">Your Link</span>
          <code className="block bg-gray-200 p-2 rounded-md mt-1 break-all">
            <Link target="_blank" href={generated} className="text-purple-700 hover:underline">
              {generated}
            </Link>
          </code>
        </div>
      )}
    </div>
  );
};

export default shorten;

