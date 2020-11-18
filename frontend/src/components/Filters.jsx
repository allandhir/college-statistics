/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { SearchOutlined } from "@ant-design/icons";
import { Rate } from "antd";
function Filters({ masterList, setSearchResult, search1Name, search2Name }) {
  const [search1, setSearch1] = useState("");
  // const [search2, setSearch2] = useState("");

  const [stars, setStars] = useState(0);
  const desc = ["below avg", "avg", "normal", "good", "best"];

  const handleStarChange = (value) => {
    setStars(value);
  };
  useEffect(() => {
    const results = masterList.filter((ele) => {
      let Name = "";

      if (ele.Fname) Name = ele.Fname;
      else Name = ele.Name;
      return Name.toString().toLowerCase().includes(search1.toLowerCase());
    });
    setSearchResult(results);
  }, [search1, masterList]);
  // ele.Rating.toString === stars.toString()
  useEffect(() => {
    const results = masterList.filter((ele) => {
      return ele.Rating.toString() === stars.toString();
    });
    setSearchResult(() => {
      if (stars === 0) return masterList;
      return results;
    });
  }, [stars, masterList]);
  return (
    <div>
      <Row className="mb-3 mt-3">
        <Col md={12} lg={4} align="left">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ background: "#283264" }}>
                <SearchOutlined
                  style={{ verticalAlign: "middle", color: "white" }}
                />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              bsSize="sm"
              placeholder={`${search1Name}`}
              value={search1}
              onChange={(e) => {
                setSearch1(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
        <Col md={12} lg={4}>
          <span>
            <Rate tooltips={desc} onChange={handleStarChange} value={stars} />
          </span>
          {/* <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{ background: "#283264" }}>
                <SearchOutlined
                  style={{ verticalAlign: "middle", color: "white" }}
                />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              bsSize="sm"
              placeholder={`${search2Name}`}
              value={search2}
              onChange={(e) => {
                setSearch2(e.target.value);
              }}
            />
          </InputGroup> */}
        </Col>
        <Col md={12} lg={4}>
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              // setSearch2("");
              setStars(0);
              setSearch1("");
            }}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Filters;
