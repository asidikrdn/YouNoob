import { Link } from "react-router-dom";
import {
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const Header = (props) => {
  const [formInput, setFormInput] = useState(props.query);
  const tombolCari = useRef();

  useEffect(() => {
    let stringQuery =
      props.query !== ""
        ? props.query
        : decodeURIComponent(window.location.search.replace(/\?\w=/, ""));
    props.setQuery(stringQuery);
    setFormInput(props.query);
  }, [props]);

  const handleKlikTombolCari = () => {
    props.setQuery(formInput);
  };

  return (
    <header className="position-fixed fixed-top">
      <Container
        fluid
        className="text-light d-flex justify-content-between px-0"
        style={{ height: "3.5em" }}
      >
        <Row className="w-100 g-0">
          <Col md={3} className="d-flex">
            <div style={{ width: "5.5em" }} className="d-flex">
              <OverlayTrigger
                trigger="click"
                placement={"bottom"}
                overlay={
                  <Popover id={`popover-positioned-${"bottom"}`}>
                    <Popover.Header as="h3" className="text-center">
                      Navigation drawers
                    </Popover.Header>
                    <Popover.Body className="text-center">
                      Fitur ini belum tersedia
                    </Popover.Body>
                  </Popover>
                }
              >
                <i
                  className="fa-solid fa-bars text-light mx-auto my-auto h3"
                  style={{ cursor: "pointer" }}
                ></i>
              </OverlayTrigger>
            </div>
            <Link to="/" style={{ all: "unset" }} className="d-flex">
              <i
                className="fa-brands fa-youtube h1 my-auto mx-2 text-danger"
                style={{ cursor: "pointer" }}
              ></i>
              <h2 className="fw-semibold mt-1" style={{ cursor: "pointer" }}>
                YouNoob<sup className="fs-5 fw-normal">ID</sup>
              </h2>
            </Link>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            {/* <Form onSubmit={handleFormSubmit} className="w-75"> */}
            <InputGroup className="w-75">
              <Form.Control
                type="text"
                className="bg-black border-secondary text-light"
                placeholder="Telusuri"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                onKeyUp={(e) => {
                  e.key === "Enter" && tombolCari.current.click();
                }}
              ></Form.Control>
              <Link
                to={`/search?q=${encodeURIComponent(formInput)}`}
                style={{ all: "unset" }}
                ref={tombolCari}
                onClick={handleKlikTombolCari}
              >
                <InputGroup.Text
                  className="bg-dark border-secondary h-100"
                  style={{
                    borderRadius: "0px 5px 5px 0px",
                    cursor: "pointer",
                  }}
                >
                  <button
                    type="submit"
                    style={{ border: "none", background: "transparent" }}
                  >
                    <i className="fa-solid fa-magnifying-glass text-light"></i>
                  </button>
                </InputGroup.Text>
              </Link>
            </InputGroup>
            {/* </Form> */}
          </Col>
          <Col md={3} className="d-flex justify-content-end align-items-end">
            <OverlayTrigger
              trigger="click"
              placement={"bottom"}
              overlay={
                <Popover id={`popover-positioned-${"bottom"}`}>
                  <Popover.Header as="h3" className="text-center">
                    Notification
                  </Popover.Header>
                  <Popover.Body className="text-center">
                    Fitur ini belum tersedia
                  </Popover.Body>
                </Popover>
              }
            >
              <i
                className="fa-solid fa-bell h3 my-auto mx-3"
                style={{ cursor: "pointer" }}
              ></i>
            </OverlayTrigger>
            <OverlayTrigger
              trigger="click"
              placement={"bottom"}
              overlay={
                <Popover id={`popover-positioned-${"bottom"}`}>
                  <Popover.Header as="h3" className="text-center">
                    User Login
                  </Popover.Header>
                  <Popover.Body className="text-center">
                    Fitur ini belum tersedia
                  </Popover.Body>
                </Popover>
              }
            >
              <i
                className="fa-solid fa-circle-user my-auto mx-4 h1"
                style={{ cursor: "pointer" }}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
