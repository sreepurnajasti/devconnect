import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";
const InputGroup = ({
  name,
  id,
  placeholder,
  value,
  error,
  icon,
  type,
  info,
  pattern,
  onChange
}) => {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          type={type}
          className={classnames("form-control", {
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          pattern={pattern}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <div>
        {info && <small className="form-text text-muted">{info}</small>}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
