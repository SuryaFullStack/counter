import React from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";
import axios from "axios";

const CounterValue = ({
  countLimit = 0,
  setCountLimit = () => {},
  setIsSpin = () => {},
  showAlert = () => {},
} = {}) => {
  const validateCounter = (count) => {
      return count <= 1000;
    },
    updateCountLimit = ({ target: { value = "" } = {} } = {}) => {
      if (!validateCounter(value)) {
        showAlert(true);
        return true;
      }
      setIsSpin(true);
      showAlert(false);
      //TODO: Can be used debouncing for unwanted api call.
      axios
        .put(
          "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
          { counter1: value }
        )
        .then(
          ({ data: { counter1 = 0 } = {}, status = 200, statusText = "" }) => {
            status === 200 && statusText === "OK" && setCountLimit(counter1);
            setIsSpin(false);
          }
        );
    };
  return (
    <>
      <Card.Body>
        <Card.Title>Counter Value</Card.Title>
        <Form.Control
          size="lg"
          type="string"
          value={countLimit}
          onChange={(e) => updateCountLimit(e)}
        />
      </Card.Body>
    </>
  );
};

export default CounterValue;

CounterValue.propTypes = {
  countLimit: PropTypes.number,
  setCountLimit: PropTypes.func,
  setIsSpin: PropTypes.func,
  showAlert: PropTypes.func,
};
