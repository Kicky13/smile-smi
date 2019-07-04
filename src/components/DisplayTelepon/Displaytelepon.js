import React from "react";
import { NavLink } from "reactstrap";

class Displaytelepon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bukutelpon: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    const styleDiv = {
      width: "1322px",
      height: "1000px",
      overflow: "hidden",
      position: "relative"
    };
    const styleIframe = {
      width: "1292px",
      height: "1000px",
      position: "absolute",
      top: "-120px"
    };
    
    return (
      <div>
        <div className="telepon">
          <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT}>Home</NavLink></li>
              <li class="breadcrumb-item active" aria-current="page">Buku Telepon</li>
            </ol>
          </nav>
          <h3><b>Buku Telepon</b></h3>

          <div className="row">
            <div className="col-md-12">
              <div style={styleDiv}>
                <iframe style={styleIframe} src="http://app.semenindonesia.com/sgg/hris/bukutelpon/"></iframe>
              </div>
              {/* <Table bordered hover>
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
              </Table> */}
              </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Displaytelepon;
