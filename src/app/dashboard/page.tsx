"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET || "supersecret";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Read JWT from cookie
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!cookie) return;

    const token = cookie.split("=")[1];

    try {
      const decoded: any = jwt.decode(token);
      setUsername(decoded.username);
    } catch (error) {
      console.error("Invalid token");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      {username ? (
        <p className="text-xl">Hello, <span className="font-semibold">{username}</span>!</p>
      ) : (
        <p className="text-red-500">User not logged in.</p>
      )}
    </div>
  );
}
<Button
  className="mt-4"
  onClick={async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/institution-login";
  }}
>
  Logout
</Button>
