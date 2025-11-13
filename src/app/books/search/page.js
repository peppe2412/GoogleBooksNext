import api from "@/app/api/api";
import style from "./css/search.module.css";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(null);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await api.get(`/api/books?q=${query}`);
      setResults(result.data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const importBook = async (id) => {
    setImporting(id);
    try {
      const result = await api.get(`/book/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setImporting(null);
    }
  };

  return (
    <>
      <div className="join">
        <div>
          <label className="input validator join-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="search"
              placeholder="Cerca il tuo libro....."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <button onClick={searchBooks} className="button_search">
          {loading ? <span className={style.loader}></span> : "Cerca"}
        </button>
      </div>

      <section className="mt-5">
        <div>
          {results.length > 0 && (
            <ul className="space-y-4 mb-7">
              {results.map((book) => {
                const info = book.volumeInfo;
                return (
                  <li
                    key={book.id}
                    className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                  >
                    <div>
                      <div>
                        <img src={`${info.thumbnail}`} alt="" />
                      </div>
                      <h2 className="font-semibold text-lg">{info.title}</h2>
                      <p className="text-sm text-gray-600">
                        {info.authors
                          ? info.authors.join(", ")
                          : "Autore sconosciuto"}
                      </p>
                    </div>

                    <button
                      onClick={() => importBook(book.id)}
                      disabled={importing === book.id}
                      className={`px-3 py-1 rounded-lg ${
                        importing === book.id
                          ? "bg-gray-400 text-white"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {importing === book.id ? (
                        <span className={style.loader}></span>
                      ) : (
                        "Importa"
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {results.length == 0 && !loading && <h3 className="text-3xl">Nessun Risultato</h3>}
        </div>
      </section>
    </>
  );
}
