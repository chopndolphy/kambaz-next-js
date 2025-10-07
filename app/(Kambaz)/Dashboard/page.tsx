import Link from "next/link";
import Image from "next/image";
import {
    Row,
    Col,
    Button,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
} from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/reactjs.jpg"
                                    width="100%"
                                    height={160}
                                    alt="ReactJS"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS1234 React JS
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Full Stack software developer
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/opengl.jpg"
                                    width="100%"
                                    height={160}
                                    alt="OpenGL"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS8732 OpenGL
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Computer Graphics
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/java.jpg"
                                    width="100%"
                                    height={160}
                                    alt="Java"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS1012 Java
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Object oriented design
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/linux.jpg"
                                    width="100%"
                                    height={160}
                                    alt="Linux"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS3288 Linux
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Computer Systems
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/cpp.jpg"
                                    width="100%"
                                    height={160}
                                    alt="C++"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS3102 C++
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        High-Performance Programming
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/python.jpg"
                                    width="100%"
                                    height={160}
                                    alt="Python"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS0001 Python
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Intro to Programming
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link
                                href="/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <CardImg
                                    variant="top"
                                    src="/images/raspberrypi.jpg"
                                    width="100%"
                                    height={160}
                                    alt="Raspberry Pi"
                                />
                                <CardBody>
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS8900 Raspberry Pi
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Embedded Development Intro to Programming
                                    </CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
