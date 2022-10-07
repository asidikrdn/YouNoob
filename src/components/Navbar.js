import { Link } from "react-router-dom";
import { Container, OverlayTrigger, Popover } from "react-bootstrap";

const Navbar = () => {
  return (
    <nav style={{ width: "5.5em" }} className="position-fixed">
      <Container
        fluid
        className="pt-0 text-light justify-content-start align-items-center d-flex flex-column"
      >
        <Link to="/" style={{ all: "unset" }} className="nav-link">
          <div className="d-flex flex-column align-items-center my-3">
            <i className="fa-solid fa-house fs-4"></i>
            <small>Beranda</small>
          </div>
        </Link>
        <OverlayTrigger
          trigger="click"
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-${"right"}`}>
              <Popover.Header as="h3" className="text-center">
                Explore
              </Popover.Header>
              <Popover.Body className="text-center">
                Fitur ini belum tersedia
              </Popover.Body>
            </Popover>
          }
        >
          <div className="d-flex flex-column align-items-center my-3">
            <i className="fa-regular fa-compass fs-4"></i>
            <small>Eksplorasi</small>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-${"right"}`}>
              <Popover.Header as="h3" className="text-center">
                Subscription
              </Popover.Header>
              <Popover.Body className="text-center">
                Fitur ini belum tersedia
              </Popover.Body>
            </Popover>
          }
        >
          <div className="d-flex flex-column align-items-center my-3">
            <i className="fa-solid fa-box-archive fs-4"></i>
            <small>Subscription</small>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-${"right"}`}>
              <Popover.Header as="h3" className="text-center">
                Collection
              </Popover.Header>
              <Popover.Body className="text-center">
                Fitur ini belum tersedia
              </Popover.Body>
            </Popover>
          }
        >
          <div className="d-flex flex-column align-items-center my-3">
            <i className="fa-solid fa-clapperboard fs-4"></i>
            <small>Koleksi</small>
          </div>
        </OverlayTrigger>
      </Container>
    </nav>
  );
};

export default Navbar;
