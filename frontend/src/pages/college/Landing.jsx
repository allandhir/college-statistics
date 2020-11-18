import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../../assets/scss/Landing.scss";
import WhiteBtnOutline from "../../components/WhiteBtnOutline";
import illustration from "../../assets/images/home4.svg";
import { useHistory } from "react-router-dom";
function Landing() {
  const history = useHistory();
  return (
    <div
      className="gradient"
      style={{
        height: "100vh",
        overflow: "hidden",
        // margin: "0 auto",
      }}
    >
      <Container className="h-100 fade-in d-flex ">
        <Row className="align-items-center">
          <Col md={12} lg={6}>
            <Row className="pt-5">
              <Col>
                <h1 style={{ color: "white" }}>
                  <b>College Stats</b>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  An interactive dashboard to visualize stats for colleges
                  around the world
                </span>
              </Col>
            </Row>
            <Row className="pt-2">
              <Col>
                <WhiteBtnOutline
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  Dashboard
                </WhiteBtnOutline>
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={6} className="d-none d-lg-block">
            <Row>
              <Col>
                <img
                  src={illustration}
                  alt="Illustration"
                  style={{ height: "300px" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
