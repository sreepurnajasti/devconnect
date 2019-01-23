import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addExperience } from "../../actions/experienceActions";

export class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      description: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let errors = this.state.errors;
    let name = e.target.name;
    if (errors[name]) {
      delete errors[name];
      this.setState({ errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    console.log(userExp);
    this.props.addExperience(userExp, this.props.history);
  }
  onChecked() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-3 text-center">Add Experience</h1>
            <h2 className="font-weight-light text-center mb-4">
              Add any job or position you had!!
            </h2>
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="* Title:"
                  placeholder="Enter Position"
                  name="title"
                  id="title"
                  error={errors.title}
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="* Company:"
                  placeholder="Enter Company"
                  name="company"
                  id="company"
                  error={errors.company}
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="Location:"
                  placeholder="Enter Location"
                  name="location"
                  id="location"
                  error={errors.location}
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  label="* From:"
                  placeholder="Enter Start Date"
                  name="from"
                  id="from"
                  type="date"
                  error={errors.from}
                  value={this.state.from}
                  onChange={this.onChange}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onChecked}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Working
                  </label>
                </div>
                <TextFieldGroup
                  label="To:"
                  placeholder="Enter End Date"
                  name="to"
                  id="to"
                  type="date"
                  error={errors.to}
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  label="Description:"
                  placeholder="Enter description"
                  name="description"
                  id="description"
                  error={errors.description}
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <button type="submit" className="btn btn-info btn-block shadow">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.PropTypes = {
  AddExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = {
  addExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
