import { useState, React } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import ChallengeList from "./pages/ChallengesList";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChallengeDetails from "./pages/ChallengeDetails";
import AddChallenge from "./pages/AddChallenge";
import EditChallengeForm from "./pages/EditChallengeForm";
import Authentication, { PageType } from "./pages/Authentication";

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
      <BrowserRouter>
        <Navbar name="Roma" surname="Lopes" />
        <h1 className="text-3xl font-bold underline text-red-300">
          Challenge App
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ChallengeList />
                <Features />
              </>
            }
          />

          <Route
            path="/login"
            element={<Authentication pageType={PageType.login} />}
          />
          <Route
            path="/register"
            element={<Authentication pageType={PageType.register} />}
          />

          <Route
            path="/challenges"
            element={
              <>
                <ChallengeList />
              </>
            }
          />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          {/* <Route path="/posts/:id/edit" element={<EditChallengeForm />} /> */}
          <Route path="/add-challenge" element={<AddChallenge />} />
        </Routes>
      </BrowserRouter>
      <Footer name="Roma" surname="Lopes" />
    </div>
  );
}

export default App;
