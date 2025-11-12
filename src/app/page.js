"use client";
import api from "./api/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <>
      <header className="flex justify-center py-16">
        <div className="grid grid-cols-1">
          <h1 className="lg:text-6xl text-3xl text-center">Books Next Commerce</h1>
        </div>
      </header>
    </>
  );
}
