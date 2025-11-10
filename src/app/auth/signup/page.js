"use client";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/register", {
        name: username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setUsername("")
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      router.push("/");
    } catch (error) {
      console.log("Errore:", error);
    }
  };

  return (
    <section className="container flex justify-center py-16">
      <div className="">
        <form method="POST" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
          </div>
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
            <label htmlFor="password_confirmation">Conferma Password</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              name="password_confirmation"
            />
          </div>
          <div>
            <button type="submit">Registrati</button>
          </div>
        </form>
      </div>
    </section>
  );
}
