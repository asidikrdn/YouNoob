import React, { useEffect, useRef } from "react";
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

const Video = (props) => {
  // console.log(videoId);
  const videoId = useRef();

  useEffect(() => {
    videoId.current = decodeURI(window.location.search.replace(/\?v=/, ""));
    props.onGetVideoDetails(videoId.current);
    props.onGetRelatedVideos(videoId.current);
    // console.log(videoId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRelatedVideoClick = (e) => {
    props.onGetVideoDetails(e.target.id);
    props.onGetRelatedVideos(e.target.id);
  };

  // console.log(props.videoDetails.description.split("\n"));

  return (
    <Container fluid>
      <Row>
        <Col
          md={8}
          className="p-3 d-flex justify-content-center flex-wrap text-light"
        >
          {props.loading ? (
            <div className="d-flex justify-content-center w-100">
              <Spinner
                animation="border"
                variant="light"
                style={{
                  width: "5em",
                  height: "5em",
                  fontSize: "2em",
                  marginTop: "2em",
                  opacity: "65%",
                }}
              />
            </div>
          ) : (
            <div>
              <YouTube
                videoId={videoId.current}
                title={props.videoDetails.title}
                opts={{
                  width: "800px",
                  height: "480px",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                className="me-auto"
              />
              <h4 className="me-auto">{props.videoDetails.title}</h4>
              <small className="me-auto">
                {" "}
                {props.videoDetails.stats !== undefined
                  ? `${props.videoDetails.stats.views.toLocaleString()}x ditonton`
                  : undefined}
                {"  "}
                <i
                  className="fa-solid fa-circle"
                  style={{ fontSize: "0.3em" }}
                ></i>
                {"  "}
                {props.videoDetails.publishedDate}
              </small>
              <hr className="border-2 opacity-25 w-100" />
              <Row g={0} className="w-100">
                <Col xs={1} className="px-0 mx-0">
                  <img
                    className="rounded-circle me-2"
                    alt=""
                    src={
                      props.videoDetails.author !== undefined
                        ? props.videoDetails.author.avatar[
                            props.videoDetails.author.avatar.length - 1
                          ].url
                        : undefined
                    }
                    width="50"
                  />
                </Col>
                <Col xs={11} className="px-0 mx-0">
                  <p className="py-0 my-0">
                    {props.videoDetails.author !== undefined
                      ? props.videoDetails.author.title
                      : undefined}
                  </p>
                  <small className="py-0 my-0 opacity-50">
                    {props.videoDetails.author !== undefined
                      ? props.videoDetails.author.stats.subscribersText
                      : undefined}
                  </small>
                </Col>
                <Col xs={{ span: 11, offset: 1 }} className="px-0 pt-3">
                  {/* <p>{props.videoDetails.description}</p> */}
                  {props.videoDetails.description !== undefined
                    ? props.videoDetails.description
                        .split("\n")
                        .map((el, i) => {
                          let textDesc;
                          if (el === "") {
                            textDesc = <small>&nbsp;</small>;
                          } else textDesc = el;
                          return (
                            <p key={i} className="py-0 my-0">
                              {textDesc}
                            </p>
                          );
                        })
                    : undefined}
                </Col>
              </Row>
            </div>
          )}
        </Col>

        {/* Related Videos */}
        <Col md={4}>
          {props.loading ? (
            <div className="d-flex justify-content-center w-100">
              <Spinner
                animation="border"
                variant="light"
                style={{
                  width: "5em",
                  height: "5em",
                  fontSize: "2em",
                  marginTop: "2em",
                  opacity: "65%",
                }}
              />
            </div>
          ) : (
            props.listVideos.map((content, i) => {
              return (
                <Link
                  to={`/watch?v=${content.video.videoId}`}
                  id={content.video.videoId}
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={handleRelatedVideoClick}
                >
                  <Card
                    className="my-3"
                    bg="transparent"
                    border="0"
                    text="white"
                  >
                    <Row g="0" className="w-100">
                      <Col md={5} className="px-0">
                        <Card.Img
                          src={
                            content.video.thumbnails[
                              content.video.thumbnails.length - 1
                            ].url
                          }
                          alt="thumbnail"
                          style={{ height: "120px", objectFit: "cover" }}
                        ></Card.Img>
                      </Col>
                      <Col md={7}>
                        <Card.Body className="pt-0 ps-0">
                          <Card.Title as="h6" className="mb-0">
                            {content.video.title.length < 35
                              ? content.video.title
                              : content.video.title.slice(0, 35) + " . . ."}
                          </Card.Title>
                          <Card.Text
                            as="small"
                            className="d-block mt-2 text-start opacity-75"
                            style={{ fontSize: "0.8em" }}
                          >
                            {content.video.author.title}
                          </Card.Text>
                          <Card.Subtitle
                            as="small"
                            className="opacity-75"
                            style={{ fontSize: "0.7em" }}
                          >
                            {content.video.stats.views !== undefined
                              ? `${content.video.stats.views.toLocaleString()}x ditonton`
                              : `LIVE`}
                            {"  "}
                            <i
                              className="fa-solid fa-circle"
                              style={{ fontSize: "0.3em" }}
                            ></i>
                            {"  "}
                            {content.video.publishedTimeText}
                          </Card.Subtitle>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Link>
              );
            })
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Video;
