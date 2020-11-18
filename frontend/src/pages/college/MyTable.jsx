import { Button, Divider, Rate, Table, Tag } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
  collegeListByCity,
  collegeListByCountry,
  collegeListByState,
  listCityCollegesByCourse,
  listCountryCollegesByCourse,
  listStateCollegesByCourse,
  listStudents,
} from "../../services";
import LineChart from "../../components/LineChart";
import {
  BankOutlined,
  // AimOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import WhiteCard from "../../components/WhiteCard";
import Filters from "../../components/Filters";
const columns = [
  {
    title: "College",
    dataIndex: "Name",
    render: (name) => <h6 style={{ color: "#028dff" }}>{name}</h6>,
  },
  {
    title: "Founded",
    dataIndex: "Year",
  },
  {
    title: "Courses",
    dataIndex: "Courses",
    render: (tags) => {
      if (typeof tags === "object") {
        return (
          <>
            {tags.map((tag) => {
              let color = "blue";
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      }
      return (
        <Tag color={"blue"} key={tags}>
          {tags}
        </Tag>
      );
    },
  },
  // {
  //   title: "Students",
  //   dataIndex: "Students",
  // },
  {
    title: "Country",
    dataIndex: "Country",
  },
  {
    title: "State",
    dataIndex: "State",
  },
  {
    title: "City",
    dataIndex: "City",
  },
  {
    title: "Rating",
    dataIndex: "Rating",
    render: (Rating) => <Rate disabled defaultValue={Rating} />,
  },
];
const studentColumns = [
  {
    title: "Fname",
    dataIndex: "Fname",
    render: (fname) => <h6 style={{ color: "#028dff" }}>{fname}</h6>,
  },
  {
    title: "Batch",
    dataIndex: "Year",
  },
  // {
  //   title: "Email",
  //   dataIndex: "Email",
  // },
  {
    title: "Course",
    dataIndex: "Course",
    render: (course) => (
      <Tag color={"blue"} key={course}>
        {course}
      </Tag>
    ),
  },
  {
    title: "Skills",
    dataIndex: "Skills",
    render: (skills) =>
      skills.map((skill) => {
        return (
          <Tag color={"green"} key={skill}>
            {skill}
          </Tag>
        );
      }),
  },
];
function MyTable(props) {
  const { country, state, city, course, collegeTableRef } = props;
  const [collegeList, setCollegeList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [collegeId, setCollegeId] = useState("");

  const [tableLoading, setTableLoading] = useState(false);
  const [studentTableLoading, setStudentTableLoading] = useState(false);

  const [studentDetails, setStudentDetails] = useState("");
  const [modal, setModal] = useState(false);

  const [collegeSearchResult, setCollegeSearchResult] = useState([]);
  const studentTableRef = useRef(null);

  const executeScroll = (myRef) =>
    myRef.current.scrollIntoView({ behaviour: "smooth" });
  // const [studentSearchResult, setStudentSearchResult] = useState([]);
  /**
   *
   */
  const setCityCollegeTable = useCallback(async () => {
    setTableLoading(true);
    const { data } = await collegeListByCity(country, state, city);
    console.log("CITY LIST", data);

    setCollegeList(data);
    setTableLoading(false);
  }, [country, state, city]);

  const setStateCollegeTable = useCallback(async () => {
    setTableLoading(true);
    const { data } = await collegeListByState(country, state);
    console.log("STATE LIST", data);

    setCollegeList(data);
    setTableLoading(false);
  }, [country, state]);

  const setCountryCollegeTable = useCallback(async () => {
    setTableLoading(true);
    const { data } = await collegeListByCountry(country);
    console.log("COUNTRY LIST", data);
    setCollegeList(data);
    setTableLoading(false);
  }, [country]);
  /**
   *
   */
  const setCourseCollegeTable = useCallback(async () => {
    setTableLoading(true);
    const { data } =
      course.location === "country"
        ? await listCountryCollegesByCourse(country, course.course)
        : course.location === "state"
        ? await listStateCollegesByCourse(country, state, course.course)
        : await listCityCollegesByCourse(country, state, city, course.course);

    setCollegeList(data);
    setTableLoading(false);
  }, [country, state, city, course]);

  const setStudentTable = useCallback(async () => {
    // setStudentView(true);
    setStudentTableLoading(true);
    setStudentTableLoading(true);
    const {
      data: { Students },
    } = await listStudents(collegeId);

    setStudentList(Students);
    setStudentTableLoading(false);
  }, [collegeId]);

  useEffect(() => {
    if (course.course !== "Select Course") {
      setCourseCollegeTable();
    }
    return () => {};
  }, [setCourseCollegeTable, course]);
  useEffect(() => {
    if (city !== "Select City") {
      setCityCollegeTable();
    }
    return () => {};
  }, [setCityCollegeTable, city]);
  useEffect(() => {
    if (state !== "Select State") {
      setStateCollegeTable();
    }
    return () => {};
  }, [setStateCollegeTable, state]);
  useEffect(() => {
    if (country !== "Select Country") {
      setCountryCollegeTable();
    }
    return () => {};
  }, [setCountryCollegeTable, country]);
  useEffect(() => {
    if (collegeId !== "") setStudentTable();
    return () => {};
  }, [setStudentTable, collegeId]);

  if (country === "Select Country")
    return (
      <WhiteCard height="100px">
        <h6 style={{ color: "#028dff" }}>Select Country</h6>
      </WhiteCard>
    );
  // if (state === "Select State")
  //   return (
  //     <WhiteCard height="100px">
  //       <h6 style={{ color: "#028dff" }}>Select State</h6>
  //     </WhiteCard>
  //   );
  // if (city === "Select City")
  //   return (
  //     <WhiteCard height="100px">
  //       <h6 style={{ color: "#028dff" }}>Select City</h6>
  //     </WhiteCard>
  //   );

  return (
    <>
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <Row style={{ color: "#028dff" }}>
                <Col md={12} lg={6}>
                  <BankOutlined
                    style={{ fontSize: 18, verticalAlign: "middle" }}
                  />
                  &nbsp;
                  <span style={{ verticalAlign: "middle", fontSize: 18 }}>
                    College List
                  </span>
                </Col>
                {/* <Col md="auto" lg={6} className="text-right">
                  <AimOutlined
                    style={{ fontSize: 24, verticalAlign: "middle" }}
                  />
                  &nbsp;
                  <span style={{ verticalAlign: "middle", fontSize: 24 }}>
                    {country}, {state}, {city}
                  </span>
                </Col> */}
              </Row>
            </CardHeader>
            <CardBody className="p-1 m-1">
              <Row>
                <Col>
                  <Filters
                    masterList={collegeList}
                    search1Name="College Name"
                    // search2Name="Rating"
                    setSearchResult={(result) => {
                      setCollegeSearchResult(result);
                    }}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <div ref={collegeTableRef}>
                    <Table
                      dataSource={collegeSearchResult}
                      columns={columns}
                      loading={tableLoading}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            executeScroll(studentTableRef);
                            setCollegeId(record._id);
                          },
                        };
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <Row style={{ color: "#028dff" }}>
                <Col md={12} lg={6}>
                  <TeamOutlined
                    style={{ fontSize: 18, verticalAlign: "middle" }}
                  />
                  &nbsp;
                  <span style={{ verticalAlign: "middle", fontSize: 18 }}>
                    Students List
                  </span>
                </Col>
                <Col md={12} lg={6}>
                  <BankOutlined
                    style={{ fontSize: 18, verticalAlign: "middle" }}
                  />
                  &nbsp;
                  <span style={{ verticalAlign: "middle", fontSize: 18 }}>
                    {studentList[0]
                      ? studentList[0].CollegeName
                      : "Select College"}
                  </span>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0 m-0">
              <Row>
                <Col>
                  <div ref={studentTableRef}>
                    <Table
                      dataSource={studentList}
                      columns={studentColumns}
                      loading={studentTableLoading}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            console.log("Student Details", record);
                            setModal(true);
                            setStudentDetails(record);
                          },
                        };
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* <Row>
        <Col> */}
      {/* <Filters
            masterList={studentList}
            search1Name="Student Name"
            search2Name="Skills"
            setSearchResult={(result) => {
              setCollegeSearchResult(result);
            }}
          /> */}
      {/* </Col>
      </Row> */}

      {modal && (
        <Modal
          visible={modal}
          title={
            <h5 style={{ color: "#028dff" }}>
              {studentDetails.Fname} {studentDetails.Lname}
            </h5>
          }
          width={"60rem"}
          // onOk={this.handleOk}
          onCancel={() => setModal(false)}
          footer={[<Button onClick={() => setModal(false)}>Return</Button>]}
        >
          <Row>
            <Col>
              <h6 style={{ color: "#028dff" }}>Email</h6>
            </Col>
            <Col>{studentDetails.Email}</Col>
          </Row>
          <Row>
            <Col>
              <h6 style={{ color: "#028dff" }}>College</h6>
            </Col>
            <Col>{studentDetails.CollegeName}</Col>
          </Row>
          <Row>
            <Col>
              <h6 style={{ color: "#028dff" }}>Course</h6>
            </Col>
            <Col>
              <Tag color={"blue"} key={studentDetails.Course}>
                {studentDetails.Course}
              </Tag>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 style={{ color: "#028dff" }}>Skills</h6>
            </Col>
            <Col>
              {studentDetails.Skills.map((skill) => {
                return (
                  <Tag color={"green"} key={skill}>
                    {skill}
                  </Tag>
                );
              })}
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="p-2">
              <WhiteCard title={"Academic History"} height="340px">
                <LineChart studentId={studentDetails._id} />
              </WhiteCard>
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
}

export default MyTable;
