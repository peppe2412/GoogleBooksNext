"use client";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setEmail("");
      setPassword("");
      route.push("/");
    } catch (error) {
      console.log("Errore:", error);
    }
  };

  return (
    <section className="container flex justify-center py-16">
      <div className="">
        <form method="POST" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
          <div>
            <button type="submit">Accedi</button>
          </div>
        </form>
      </div>
    </section>
  );
}
