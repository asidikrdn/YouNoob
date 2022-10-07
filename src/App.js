import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [indexApiKey, setIndexApiKey] = useState(0);
  const [listVideos, setListVideos] = useState([]);
  const [listChannels, setListChannels] = useState([]);

  const getListVideos = async (q) => {
    try {
      let response = await fetch(
        `https://youtube138.p.rapidapi.com/search/?q=${encodeURIComponent(
          q
        )}&hl=id&gl=ID`,
        {
          method: "GET",
          headers: {
            // "X-RapidAPI-Key": `${apiKey[indexApiKey]}`,
            "X-RapidAPI-Key": process.env.REACT_APP_FIRST_KEY,
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
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
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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
