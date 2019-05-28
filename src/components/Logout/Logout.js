import React from "react";
import * as actions from "../../store/actions";
class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actions.authLogout());
  }

  render() {
    console.log(this.props);
    return <div />;
  }
}

export default Logout;
