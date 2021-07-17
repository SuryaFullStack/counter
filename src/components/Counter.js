import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Spinner,
  Card,
  InputGroup,
  Button,
  FormControl,
  Alert,
} from "react-bootstrap";

const Counter = ({
  countLimit = 0,
  isSpin = false,
  alert = false
} = {}) => {
  const [count, setCount] = useState(1);
  return (
    <Card.Body>
      {isSpin && (
        <>
          <Spinner animation="border" size="sm" />
          Saving counter value
        </>
      )}
      {alert && <Alert variant="danger">Count limit must not be greater than 1000 and less than 0</Alert>}
      <InputGroup className="mb-3">
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => setCount(count > 1 ? count - 1 : count)}
          style={{ width: "25%" }}
        >
          -
        </Button>
        <FormControl
          aria-label="Example text with two button addons"
          size="lg"
          value={count > countLimit ? countLimit : count}
          readOnly
          isInvalid
          style={{ backgroundImage: "none" }}
        />
        <Button
          variant="danger"
          size="lg"
          onClick={() => setCount(count < countLimit ? count + 1 : count)}
          style={{ width: "25%" }}
        >
          +
        </Button>
      </InputGroup>
    </Card.Body>
  );
};

export default Counter;

Counter.propTypes = {
  countLimit: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  setCountLimit: PropTypes.func,
  isSpin: PropTypes.bool,
  alert: PropTypes.bool
};
