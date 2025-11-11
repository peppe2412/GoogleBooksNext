"use client";
import Link from "next/link";
import styles from "./css/navbar.module.css";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [user, setUser] = useState("");
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

      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      route.push("/");
    } catch (error) {
      console.log("Errore:", error);
    }
  };

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
      navigate("/", { state: { message: response.data.message } });
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };

  return (
    <nav className="shadow p-4 text-lg bg-primary-content">
      <div className="flex items-center">
        <Link className={`${styles.nav_links} text-info-content`} href={"/"}>
          Home
        </Link>
        <div className="w-full flex justify-end">
          {!user ? (
            <>
              <button
                className="btn btn-primary text-lg me-4"
                onClick={() => document.getElementById("login").showModal()}
              >
                Login
              </button>
              <button
                className="btn btn-outline btn-success text-lg"
                onClick={() => document.getElementById("signUp").showModal()}
              >
                Sign Up
              </button>
            </>
          ) : (
            <details className="dropdown me-4">
              <summary className="btn m-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
                {user.name}
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-48 p-2 shadow-sm right-4">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <button className="btn btn-error" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </details>
          )}
          <dialog id="login" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex justify-center flex-col items-center">
                <h3 className="font-bold text-lg text-center mb-7">Login</h3>
                <form method="POST" onSubmit={handleLogin}>
                  <div className="mb-5">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="block">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div>
                    <button className="btn btn-outline btn-info" type="submit">
                      Accedi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="signUp" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="flex justify-center flex-col items-center">
                <h3 className="font-bold text-lg text-center mb-7">Sign Up</h3>
                <form method="POST" onSubmit={handleRegister}>
                  <div className="mb-5">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="username"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="block">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="password" className="block">
                      Conferma Password
                    </label>
                    <input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      name="password_confirmation"
                      className="input input-info input-sm"
                    />
                  </div>
                  <div>
                    <button className="btn btn-outline btn-info" type="submit">
                      Registrati
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </nav>
  );
}
