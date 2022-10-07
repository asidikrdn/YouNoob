import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect } from "react";

const SearchResult = (props) => {
  useEffect(() => {
    props.onSearch(props.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.query]);

  // console.log(props.query);
  // console.log(props.listChannels);
  // console.log(props.listVideos);
  // console.log(props.apiKey[props.indexApiKey]);
  return (
    <>
      <Container className="pt-3">
        <Row>
          {props.loading ? (
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
          ) : (
            props.listVideos.map((content, i) => {
              return (
                <Col xs={12} className="mb-1" key={i}>
                  <Link
                    to={`/watch?v=${content.video.videoId}`}
                    style={{ all: "unset", cursor: "pointer" }}
                  >
                    <Card
                      className="mb-3 me-5"
                      bg="transparent"
                      border="0"
                      text="white"
                    >
                      <Row g="0">
                        <Col md={4}>
                          <Card.Img
                            src={
                              content.video.thumbnails.length > 1
                                ? content.video.thumbnails[
                                    content.video.thumbnails.length - 1
                                  ].url
                                : content.video.thumbnails[0].url
                            }
                            alt="thumbnail"
                            style={{ maxHeight: "202px", objectFit: "cover" }}
                          ></Card.Img>
                        </Col>
                        <Col md={8}>
                          <Card.Body className="pt-0 ps-0">
                            <Card.Title as="h4" className="mb-0">
                              {content.video.title}
                            </Card.Title>
                            <Card.Subtitle as="small" className="opacity-75">
                              {`${content.video.stats.views}x ditonton`}
                              {"  "}
                              <i
                                className="fa-solid fa-circle"
                                style={{ fontSize: "0.3em" }}
                              ></i>
                              {"  "}
                              {content.video.publishedTimeText}
                            </Card.Subtitle>
                            <Card.Text
                              as="small"
                              className="d-block my-2 opacity-75"
                            >
                              <img
                                className="rounded-circle me-2"
                                alt=""
                                src={content.video.author.avatar[0].url}
                                width="24"
                              />
                              {content.video.author.title}
                            </Card.Text>
                            <Card.Text
                              as="small"
                              className="d-block my-2 opacity-75"
                            >
                              {content.video.descriptionSnippet}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
};

export default SearchResult;
