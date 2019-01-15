import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div class="btn-group mb-4">
      <Link to="/edit-profile" class="btn btn-light mr-2">
        <i className="fa fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>
      <Link to="/add-experience" class="btn btn-light  mr-2">
        <i className="fa fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" class="btn btn-light mr-2">
        <i className="fa fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
