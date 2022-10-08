import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [listVideos, setListVideos] = useState([]);
  const [listChannels, setListChannels] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_FIRST_KEY);
  const [errStatus, setErrStatus] = useState(0);

  const getListVideos = async (q) => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://youtube138.p.rapidapi.com/search/?q=${encodeURIComponent(
          q
        )}&hl=id&gl=ID`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        setErrStatus(response.status);
        throw new Error(
          "Error saat mengambil data dengan kode: " + response.status
        );
      } else {
        let data = await response.json();
        setListVideos(
          data.contents.filter((el) => {
            return el.type === "video";
          })
        );
        setListChannels(
          data.contents.filter((el) => {
            return el.type === "channel";
          })
        );
        setErrStatus(response.status);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const getVideoDetails = async (videoId) => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://youtube138.p.rapidapi.com/video/details/?id=${videoId}&hl=id&gl=ID`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        setErrStatus(response.status);
        throw new Error(
          "Error saat mengambil data dengan kode: " + response.status
        );
      } else {
        let data = await response.json();
        setVideoDetails(data);
        setErrStatus(response.status);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getRelatedVideos = async (videoId) => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://youtube138.p.rapidapi.com/video/related-contents/?id=${videoId}&hl=id&gl=ID`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        setErrStatus(response.status);
        throw new Error(
          "Error saat mengambil data dengan kode: " + response.status
        );
      } else {
        let data = await response.json();
        setListVideos(
          data.contents.filter((el) => {
            return el.type === "video";
          })
        );
        setListChannels(
          data.contents.filter((el) => {
            return el.type === "channel";
          })
        );
        setErrStatus(response.status);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Membuat function untuk memanggil ulang API tertentu sesuai posisi halaman
  const reload = () => {
    if (window.location.pathname === "/") {
      // console.log("Home");
      getListVideos("berita terbaru indonesia");
    }
    if (window.location.pathname === "/search") {
      // console.log("Search");
      getListVideos(query);
    }
    if (window.location.pathname === "/watch") {
      // console.log("Video");
      let videoId = decodeURI(window.location.search.replace(/\?v=/, ""));
      getVideoDetails(videoId);
      getRelatedVideos(videoId);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log(errStatus);

    // Bila errornya 403, ganti APIkey dan panggil function reload (403 artinya forbidden, biasanya karena api key over quota)
    if (errStatus === 403) {
      if (apiKey === process.env.REACT_APP_FIRST_KEY) {
        console.log("ganti ke key 2");
        setApiKey(process.env.REACT_APP_SECOND_KEY);
        reload();
      } else if (apiKey === process.env.REACT_APP_SECOND_KEY) {
        console.log("ganti ke key 3");
        setApiKey(process.env.REACT_APP_THIRD_KEY);
        reload();
      } else if (apiKey === process.env.REACT_APP_THIRD_KEY) {
        console.log("ganti ke key 4");
        setApiKey(process.env.REACT_APP_FOURTH_KEY);
        reload();
      }
    }

    // Bila terjadi error namun bukan karena forbidden, jalankan reload saja.. (200 artinya sukses, 403 forbidden)
    else if (errStatus !== 403 && errStatus !== 200) {
      reload();
    }
  });

  console.log(apiKey);
  // console.log(query);

  return (
    <Router>
      <Header query={query} setQuery={setQuery}></Header>
      <Navbar></Navbar>
      <MainContent
        query={query}
        setQuery={setQuery}
        loading={loading}
        listVideos={listVideos}
        listChannels={listChannels}
        onGetListVideos={getListVideos}
        videoDetails={videoDetails}
        onGetVideoDetails={getVideoDetails}
        onGetRelatedVideos={getRelatedVideos}
      ></MainContent>
    </Router>
  );
};

export default App;
