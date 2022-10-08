import Home from "./Home";
import SearchResult from "./SearchResult";
import { Routes, Route } from "react-router-dom";
import Video from "./Video";

const MainContent = (props) => {
  return (
    <main style={{ marginTop: "3.5em", marginLeft: "5.5em" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              query={props.query}
              loading={props.loading}
              listVideos={props.listVideos}
              listChannels={props.listChannels}
              onGetListVideos={props.onGetListVideos}
            ></Home>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchResult
              query={props.query}
              loading={props.loading}
              listVideos={props.listVideos}
              listChannels={props.listChannels}
              onSearch={props.onGetListVideos}
            ></SearchResult>
          }
        ></Route>
        <Route
          path="/watch"
          element={
            <Video
              loading={props.loading}
              videoDetails={props.videoDetails}
              onGetVideoDetails={props.onGetVideoDetails}
            />
          }
        ></Route>
      </Routes>
    </main>
  );
};

export default MainContent;
