"use client";
import api from "./api/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/api/user")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Si è vericato un errore: ", error);
          setUser(null);
        });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/logout");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      {user && (
        <div>
          <div>
            <p>Ciao, {user.name}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-700 text-white">Logout</button>
        </div>
      )}
    </>
  );
}
