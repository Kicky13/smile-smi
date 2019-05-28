import React from "react";
import * as actions from "../../store/actions";

class Page extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(actions.authLogout());
  }

  render() {
    window.location = process.env.REACT_APP_SMILE_API + '';
    return (
      <div>
        <h1>Logout JWT</h1>
      </div>
    );
  }
}

export default Page;
