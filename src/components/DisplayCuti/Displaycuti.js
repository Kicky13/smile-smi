import React from "react";
import { NavLink, Button, Table } from "reactstrap";
import Http from "../../Http";
class Displaycuti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuti: []
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.post(process.env.REACT_APP_SMILE_API + "api/APIHRIS/listcuti", userdata)
    .then(res => {
      this.setState({
        cuti: res.data.rows
      });
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
    const cuti = this.state.cuti;

    return (
      <div>
        <div className="user-sppd">
        <div className="row">
          <div className="col-md-10">
          <h2>CUTI</h2>
          </div>
          {/* <div className="col-md-2">
          <Button color="primary" className="TambahSppd">Tambah</Button>{' '}
          </div> */}
        </div>

          <div className="row">
            <div className="col-md-12">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Keperluan</th>
                    <th>Mulai</th>
                    <th>Berakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {cuti.map((anObjectMapped, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{anObjectMapped.ct_jenis}</td>
                        <td>{anObjectMapped.ct_from}</td>
                        <td>{anObjectMapped.ct_to}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Displaycuti;
