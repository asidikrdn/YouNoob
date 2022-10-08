import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.onGetListVideos("berita terbaru indonesia");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(props.listChannels);
  // console.log(props.listVideos);
  // console.log(props.apiKey[props.indexApiKey]);
  return (
    <Container fluid className="p-3">
      <Row>
        {props.listVideos.map((content, i) => {
          return (
            <Col xs={12} md={3} key={i}>
              <Link
                to={`/watch?v=${content.video.videoId}`}
                style={{ all: "unset", cursor: "pointer" }}
              >
                <Card
                  bg="transparent"
                  text="white"
                  border="0"
                  className="mb-5 pb-2"
                >
                  <Card.Img
                    variant="top"
                    src={
                      content.video.thumbnails.length > 1
                        ? content.video.thumbnails[
                            content.video.thumbnails.length - 1
                          ].url
                        : content.video.thumbnails[0].url
                    }
                  ></Card.Img>
                  <Card.Body className="ps-0 pt-2">
                    <Card.Title as="h6" className="m-0">
                      {content.video.title}
                    </Card.Title>
                    <Card.Subtitle as="small" className="opacity-75">
                      {content.video.author.title}
                    </Card.Subtitle>
                    <Card.Text as="small" className="d-block opacity-75">
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
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Home;
