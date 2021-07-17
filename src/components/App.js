import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Counter from "./Counter";
import CounterValue from "./CounterValue";

import axios from "axios";

const counter = {
  position: "relative",
  top: "20%",
  left: "40%",
  display: "block",
  marginRight: "-375px",
};

const App = () => {
  const [countLimit, setCountLimit] = useState(0),
    [isSpin, setIsSpin] = useState(false),
    [alert, showAlert] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json`
      )
      .then(({ data = 1000, status = 200, statusText = "" }) => {
        status === 200 && statusText === "OK" && setCountLimit(data);
      });
  }, [countLimit]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <center>
            <h1>Counter</h1>
          </center>
        </Col>
      </Row>
      <Card border="secondary" style={{ width: "18rem", ...counter }}>
        <Counter
          setCountLimit={setCountLimit}
          countLimit={countLimit}
          isSpin={isSpin}
          alert={alert}
        />
        <CounterValue
          countLimit={countLimit}
          setCountLimit={setCountLimit}
          setIsSpin={setIsSpin}
          showAlert={showAlert}
        />
      </Card>
    </Container>
  );
};
export default App;
