import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/educationActions";

export class Education extends Component {
  onDelete(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.specialization}</td>
        <td>{edu.location}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>{edu.description}</td>
        <td>
          <buton
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, edu._id)}
          >
            <i class="fa fa-trash" />
          </buton>
        </td>
      </tr>
    ));
    return (
      <div className="table-responsive my-4">
        <h4 className="mb-4">Education</h4>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>School / College</th>
              <th>Degree / Certification</th>
              <th>Specialization</th>
              <th>Location</th>
              <th>Years</th>
              <th>Summary</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}
Education.PropTypes = {
  deleteEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
