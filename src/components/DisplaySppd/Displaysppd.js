import React from "react";
import { NavLink, Button, Table } from "reactstrap";
import Http from "../../Http";

class Displaysppd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sppd: [],
      errorData: ""
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    Http.post(process.env.REACT_APP_SMILE_API + "api/APIHRIS/listsppd", userdata)
    .then(res => {
      if (typeof res.data.rows === 'undefined') {
        this.setState({
          errorData: "Data has error occurred"
        });
      } else {
        this.setState({
          sppd: res.data.rows
        });
      }
    })
    .catch(err => {
      const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode
        };
        if (statusCode === 401 || statusCode === 422) {
          // status 401 means unauthorized
          // status 422 means unprocessable entity
          data.error = err.response.data.message;
        }
        return Promise.reject(data);
    });
  }

  render() {
    const sppd = this.state.sppd;
    const error = this.state.errorData;
    const styleError = {
      color: "#ed0505",
      textAlign: 'center',
    }
    return (
      <div>
        <div className="user-sppd">
        <div className="row">
          <div className="col-md-10">
          <h2>SPPD</h2>
          </div>
          <div className="col-md-2">
          {/* <Button color="primary" className="TambahSppd">Tambah</Button>{' '} */}
          </div>
        </div>

          <div className="row">
            <div className="col-md-12">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Aktifitas</th>
                    <th>Jenis Dinas</th>
                    <th>Tujuan</th>
                    <th>Penginapan</th>
                    <th>Berangkat</th>
                    <th>Pulang</th>
                  </tr>
                </thead>
                <tbody>
                  {(error == "") ? sppd.map((anObjectMapped, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{anObjectMapped.KUNDE}</td>
                        <td>{anObjectMapped.RETXT}</td>
                        <td>{anObjectMapped.ZORT1}</td>
                        <td>{anObjectMapped.TKTXT}</td>
                        <td>{anObjectMapped.PDATV}</td>
                        <td>{anObjectMapped.PDATB}</td>
                      </tr>
                    );
                  }) :
                  <tr>
                    <td style={styleError} colSpan="7">Data has error occured</td>
                  </tr>
                  }
                  {/* {sppd.map((anObjectMapped, index) => {
                    if(error === "undefined") {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{anObjectMapped.KUNDE}</td>
                          <td>{anObjectMapped.RETXT}</td>
                          <td>{anObjectMapped.ZORT1}</td>
                          <td>{anObjectMapped.TKTXT}</td>
                          <td>{anObjectMapped.PDATV}</td>
                          <td>{anObjectMapped.PDATB}</td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr>
                          <p>Data has error occured</p>
                        </tr>
                      );
                    }
                  })} */}
                </tbody>
              </Table>
              </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Displaysppd;
