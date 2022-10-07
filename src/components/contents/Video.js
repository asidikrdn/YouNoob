import { useEffect, useRef } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import YouTube from "react-youtube";

const Video = (props) => {
  // console.log(videoId);
  const videoId = useRef();

  useEffect(() => {
    videoId.current = decodeURI(window.location.search.replace(/\?v=/, ""));
    props.onGetVideoDetails(videoId.current);
    console.log(videoId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(props.videoDetails);

  return (
    <Container fluid>
      {props.loading ? (
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
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
          </Col>
        </Row>
      ) : (
        <Row>
          <Col
            md={8}
            className="p-3 d-flex justify-content-center flex-wrap text-light"
          >
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
              {props.videoDetails.stats !== undefined &&
                `${props.videoDetails.stats.views.toLocaleString()}x ditonton`}
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
                    props.videoDetails.author !== undefined &&
                    props.videoDetails.author.avatar[
                      props.videoDetails.author.avatar.length - 1
                    ].url
                  }
                  width="50"
                />
              </Col>
              <Col xs={11} className="px-0 mx-0">
                <p className="py-0 my-0">
                  {props.videoDetails.author !== undefined &&
                    props.videoDetails.author.title}
                </p>
                <small className="py-0 my-0 opacity-50">
                  {props.videoDetails.author !== undefined &&
                    props.videoDetails.author.stats.subscribersText}
                </small>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} className="px-0 pt-3">
                {/* <p>{props.videoDetails.description}</p> */}
                {props.videoDetails.description !== undefined &&
                  props.videoDetails.description.split("\n").map((el, i) => {
                    return (
                      <p key={i} className="py-0 my-0">
                        {el}
                      </p>
                    );
                  })}
              </Col>
            </Row>
          </Col>
          <Col md={4}></Col>
        </Row>
      )}
    </Container>
  );
};

export default Video;
