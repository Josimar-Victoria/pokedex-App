import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/index.scss";
import { clearToasts } from "./app/slices/AppSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/list" element={<MyList />} />
            <Route path="/about" element={<About />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/pokemon/:id" element={<Pokemon />} />
            <Route path="*" element={<Navigate to="/pokemon/1" />} />
          </Routes>
          <Footer />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
