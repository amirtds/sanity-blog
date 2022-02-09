import React from 'react';
import AllPosts from './components/AllPosts';
import OnePost from './components/OnePost';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './App.css';

export default function App() {
  return (
    <div>
      <Helmet>
        <title>Sanity Blog</title>
        <meta name="description" content="Sanity Blog" />
        <meta property='og:title' content='Sanity Blog' />
        <meta property='og:description' content='Sanity Blog' />
        <meta property='og:image' content='https://cdn.sanity.io/images/a4zwcx9l/production/ffa097961aeffbde70f97ab81ece18dc80705907-5184x3456.jpg?w=400' />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path=":slug" element={<OnePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}