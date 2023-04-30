import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Progress,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap"

import Camera from "react-dom-camera"
import Tesseract from "tesseract.js"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const Dashboard = props => {
  const breadcrumbItems = [
    { title: "Smart Language Translator", link: "#" },
    { title: "Live Capture", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Live Capture", breadcrumbItems)
  })

  const [btnprimary1, setBtnprimary1] = useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [file, setFile] = useState()
  const [progress, setProgress] = useState(0)
  const [language, setLanguage] = useState("eng")
  const [result, setResult] = useState("")

  const onFileChange = e => {
    setFile(e.target.files[0])
  }

  const processImage = () => {
    setResult("")
    setProgress(0)
    Tesseract.recognize(capturedImage, language, {
      logger: m => {
        if (m.status === "recognizing text") {
          setProgress(m.progress)
        }
      },
    }).then(({ data: { text } }) => {
      setResult(text)
    })
  }

  const speak = () => {
    const msg = new SpeechSynthesisUtterance(result)
    window.speechSynthesis.speak(msg)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Dashboard | Smart Language Translator</title>
      </MetaTags>

      {/* <Row>
        <Col mg={6} lg={6} xl={3}>
          <Card>
           
            <CardBody>
              <CardTitle className="h4">Captured Text</CardTitle>
              <CardText>
                {result}
                  </CardText>
              <Link
                to="#"
                className="btn btn-primary waves-effect waves-light"
              >
                  Speak <i className="mdi mdi-volume-high"></i>
                  </Link>
            </CardBody>
          </Card>
        </Col>

        </Row> */}

      <Row xl="8">
        <Card>
          <CardBody>
            <Row>
              <Col xl="4" style={{ padding: "10px" }}>
                <Camera onTakePhoto={image => setCapturedImage(image)} />
              </Col>
              <Col xl="4" style={{ padding: "10px" }}>
                <img
                  src={capturedImage}
                  alt="Your Captured Pic Will Pop here."
                  width={300}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Row>

      <Card >
        <CardBody>
          <Row xl="6">
            <CardTitle className="h4">Select Language</CardTitle>
           
            </Row>
            <Row xl="12">
            <Col xl="2">

                <select
                  className="btn btn-primary dropdown-toggle"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                 
                >
                  <option value="eng">English</option>
                  <option value="tel">Urdu</option>
                  <option value="fre">French</option>
                  <option value="hin">Hindi</option>
                </select>
              </Col>
            <Col xl="6">
              <Link
                onClick={processImage}
                className="btn btn-primary waves-effect waves-light"
              >
                Submit <i className="mdi mdi-subdirectory-arrow-right"></i>
              </Link>
            </Col>
            </Row>


         
          <div
            className="mb-6"
            style={{ width: "400px", marginTop: "10px", marginBottom: "10px" }}
          >
            <Progress striped color="success" value={progress} max={1} />
          </div>

          {result !== "" && (
            <div>
              <Row>
                <Col mg={6} lg={6} xl={3}>
                  <CardTitle className="h4">Captured Text</CardTitle>
                  <CardText>{result}</CardText>
                  <Link
                    onClick={speak}
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Speak <i className="mdi mdi-volume-high"></i>
                  </Link>
                </Col>
              </Row>
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)

// <Col xl="6">
// {/* Email sent */}
// <EmailSent />
// </Col>

// <Col xl="3">
// <MonthlyEarnings2 />
// </Col>

// </Row>
// <Row>

// <Col xl="4" lg="6">
// {/* inbox */}
// <Inbox />
// </Col>
// <Col xl="4" lg="6">
// {/* recent activity */}
// <RecentActivity />

// </Col>
// <Col xl="4">
// {/* widget user */}
// <WidgetUser />

// {/* yearly sales */}
// <YearlySales />
// </Col>
// </Row>

// <Row>
// <Col xl="6">
// {/* latest transactions */}
// <LatestTransactions />
// </Col>

// <Col xl="6">
// {/* latest orders */}
// <LatestOrders />
// </Col>
// </Row>
