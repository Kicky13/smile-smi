import React from "react";
import { NavLink } from "reactstrap";
class Koransminews extends React.Component {
  render() {
    return (
      <div>
        <div className="koran">
          <h2>Koran</h2>
          <div className="box-koran">
            <NavLink href="">Bisnis Indonesia</NavLink>
            <br />
            <br />
            <NavLink href="">Jawa Pos</NavLink>
            <br />
            <br />
            <NavLink href="">Duta Masyarakat</NavLink>
            <br />
            <br />
            <NavLink href="">Harian Bhirawa</NavLink>
            <br />
            <br />
            <NavLink href="">Investor Daily</NavLink>
            <br />
            <br />
            <NavLink href="">Jawa Pos Metropolis</NavLink>
            <br />
            <br />
            <NavLink href="">Kompas</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Koransminews;
