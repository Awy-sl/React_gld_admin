import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";

export default class Home extends Component {
  render() {
    const { user } = memoryUtils;
    if (!user._id) return <Redirect to="/login" />;
    return (
      <div>
        <h1>admin {user._id}</h1>
      </div>
    );
  }
}
