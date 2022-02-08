import React from 'react';
import AllPosts from './components/AllPosts';
import OnePost from './components/OnePost';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path=":slug" element={<OnePost />} />
      </Routes>
    </BrowserRouter>
  )
}