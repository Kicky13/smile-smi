import React from "react";
import { NavLink, Button, Table } from "reactstrap";
import Http from "../../Http";
class Displaytelepon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bukutelpon: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/bukutelepon")
    .then(res => {
      this.setState({
        bukutelpon: res.data.rows
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
    const bukutelepon = this.state.bukutelpon;
    return (
      <div>
        <div className="telepon">
          <div className="col-md-12">
          <h4>Home . Buku Telepon</h4>
          <h3><b>Buku Telepon</b></h3>

          <div className="row">
            <div className="col-md-12">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Badge Lama</th>
                    <th>Nama Pegawai</th>
                    <th>Nama UK</th>
                    <th>Jabatan</th>
                    <th>Status</th>
                    <th>Lokasi</th>
                    <th>Nomor Telepon</th>
                    <th>Email</th>
                    <th>Alamat Rumah</th>
                  </tr>
                </thead>
                <tbody>
                  {bukutelepon.map((anObjectMapped, index) => {
                    return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{anObjectMapped.mk_nopeg_lama}</td>
                      <td>{anObjectMapped.mk_nama}</td>
                      <td>{anObjectMapped.muk_nama}</td>
                      <td>{anObjectMapped.mjab_nama}</td>
                      <td>{anObjectMapped.mk_stat2_text}</td>
                      <td>{anObjectMapped.lokasi}</td>
                      <td>{anObjectMapped.telp}</td>
                      <td>{anObjectMapped.mail_addr}</td>
                      <td>{anObjectMapped.mk_alamat}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </Table>
              </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Displaytelepon;
