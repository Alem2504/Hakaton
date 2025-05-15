import React, { useEffect, useState } from "react";

const Hello: React.FC = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/hello", {
      method: "GET",
      credentials: "include", // 🔑 required to send the cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.text();
      })
      .then((text) => setMessage(text))
      .catch(() => setMessage("You are not logged in"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold">
      {message}
    </div>
  );
};

export default Hello;
