import { Switch } from "antd";
import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

function WhiteCard({ title, children, height, showToggle, setCourseChart }) {
  return (
    <Card className="border-0 shadow-sm" style={{ height: height }}>
      <CardHeader align="middle">
        <Row>
          <Col>
            <h5 style={{ color: "#028dff" }}>{title}</h5>
          </Col>
          {showToggle ? (
            <Col align="right">
              <Switch
                checkedChildren={title}
                unCheckedChildren="Courses"
                onChange={(checked) => setCourseChart(checked)}
                defaultChecked={false}
                // disabled={Boolean(title === "Select State")}
              />
            </Col>
          ) : null}
        </Row>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export default WhiteCard;
