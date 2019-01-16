import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/experienceActions";

export class Experience extends Component {
  onDelete(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>{exp.description}</td>
        <td>
          <buton
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, exp._id)}
          >
            <i class="fa fa-trash" />
          </buton>
        </td>
      </tr>
    ));
    return (
      <div className="table-responsive my-4">
        <h4 className="mb-4">Experience</h4>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
              <th>Years</th>
              <th>Summary</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}
Experience.PropTypes = {
  deleteExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience);
