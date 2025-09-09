import { useState, React } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";

function App() {
  return (
    <div>
      {/*
      <Navbar></Navbar>
      <Hero></Hero>
      Challenge List 
      Features 
      Footer 
    */}
      <Navbar name="Roma" surname="Lopes" />
      <Features />
      <h1 className="text-3xl font-bold underline text-red-300">
        Challenge App
      </h1>
      <Footer name="Roma" surname="Lopes" />
    </div>
  );
}

export default App;
