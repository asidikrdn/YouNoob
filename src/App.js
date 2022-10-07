import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [listVideos, setListVideos] = useState([]);
  const [listChannels, setListChannels] = useState([]);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_FIRST_KEY);
  const [errStatus, setErrStatus] = useState(false);

  const getListVideos = async (q) => {
    try {
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
        setErrStatus(true);
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
        setErrStatus(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errStatus === true && apiKey === process.env.REACT_APP_FIRST_KEY) {
      setApiKey(process.env.REACT_APP_SECOND_KEY);
    } else if (
      errStatus === true &&
      apiKey === process.env.REACT_APP_SECOND_KEY
    ) {
      setApiKey(process.env.REACT_APP_THIRD_KEY);
    } else if (
      errStatus === true &&
      apiKey === process.env.REACT_APP_THIRD_KEY
    ) {
      setApiKey(process.env.REACT_APP_FOURTH_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errStatus]);

  useEffect(() => {
    if (errStatus === true) {
      query === ""
        ? getListVideos("berita terbaru indonesia")
        : getListVideos(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // console.log(apiKey);
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
      ></MainContent>
    </Router>
  );
};

export default App;
