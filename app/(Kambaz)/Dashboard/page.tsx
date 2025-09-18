import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={150} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/8732" className="wd-dashboard-course-link">
                        <Image src="/images/opengl.jpg" width={200} height={150} />
                        <div>
                            <h5> CS8732 OpenGL </h5>
                            <p className="wd-dashboard-course-title">Computer Graphics</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1012" className="wd-dashboard-course-link">
                        <Image src="/images/java.jpg" width={200} height={150} />
                        <div>
                            <h5> CS1012 Java </h5>
                            <p className="wd-dashboard-course-title">
                                Object oriented design
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3288" className="wd-dashboard-course-link">
                        <Image src="/images/linux.jpg" width={200} height={150} />
                        <div>
                            <h5> CS3288 Linux </h5>
                            <p className="wd-dashboard-course-title">Computer Systems</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3102" className="wd-dashboard-course-link">
                        <Image src="/images/cpp.jpg" width={200} height={150} />
                        <div>
                            <h5> CS3102 C++ </h5>
                            <p className="wd-dashboard-course-title">
                                High-Performance Programming
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/0001" className="wd-dashboard-course-link">
                        <Image src="/images/python.jpg" width={200} height={150} />
                        <div>
                            <h5> CS0001 Python </h5>
                            <p className="wd-dashboard-course-title">Intro to Programming</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/8900" className="wd-dashboard-course-link">
                        <Image src="/images/raspberrypi.jpg" width={200} height={150} />
                        <div>
                            <h5> CS8900 Raspberry Pi </h5>
                            <p className="wd-dashboard-course-title">Embedded Development</p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
