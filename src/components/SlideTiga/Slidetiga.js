import React from "react";
import Slider from "react-slick";
import {NavLink} from "reactstrap";
import Http from "../../Http";
import ReeValidate from "ree-validate";

class SlideTiga extends React.Component {
    constructor() {
        super();
        this.sppdValidator = new ReeValidate({
            dep_date: 'required',
            arr_date: 'required'
        });
        this.cutiValidator = new ReeValidate({
            tgl1: 'required',
            tgl2: 'required'
        });
        this.state = {
            isOpen: false,
            kota: [],
            penginapan: [],
            aktivitas: [],
            sppdField: {
                dep_date: '',
                dep_time: '17:00',
                arr_date: '',
                arr_time: '17:00',
                city: '',
                penginapan: '',
                aktifitas: ''
            },
            cutiField: {
                tgl1: '',
                tgl2: '',
                addr: ''
            }
        }
    };

    componentDidMount() {
        Http.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/sppdCity")
            .then(res => {
                this.setState({
                    kota: res.data
                });
            })
            .catch(err => {
                const errorCode = err.response.status;
                const data = {
                    error: null,
                    errorCode
                };
                if (errorCode === 401 || errorCode === 422) {
                    data.error = err.response.data.message;
                }
                return Promise.reject(data);
            });
        Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/sppdPenginapan")
            .then(res => {
                this.setState({
                    penginapan: res.data
                });
            })
            .catch(err => {
                const errorCode = err.response.status;
                const data = {
                    error: null,
                    errorCode
                };
                if (errorCode === 401 || errorCode === 422) {
                    data.error = err.response.data.message;
                }
                return Promise.reject(data);
            });
        Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/sppdAktivitas")
            .then(res => {
                this.setState({
                    aktivitas: res.data
                });
            })
            .catch(err => {
                const errorCode = err.response.status;
                const data = {
                    error: null,
                    errorCode
                };
                if (errorCode === 401 || errorCode === 422) {
                    data.error = err.response.data.message;
                }
                return Promise.reject(data);
            });
    }

    handleSubmit(formName, e) {
        e.preventDefault();
        let field;
        if (formName == "formSppd") {
            field = this.state.sppdField;
            this.sppdValidator.validateAll(field).then(success => {
                if (success) {
                    this.saveSppd();
                    alert("Form Submitted");
                } else {
                    alert("Gagal, semua field harus diisi dengan benar. Silahkan cek kembali form");
                    console.log(this.state.sppdField);
                }
            });
        } else {
            field = this.state.cutiField;
            this.cutiValidator.validateAll(field).then(success => {
                if (success) {
                    this.saveCuti();
                    alert("Form Submitted");
                } else {
                    alert("Gagal, semua field harus diisi dengan benar. Silahkan cek kembali form");
                    console.log(this.state.cutiField);
                }
            })
        }
    }

    saveSppd() {
        let dataForm = this.state.sppdField;
        let responseAPI;
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.post(process.env.REACT_APP_SMILE_API + "api/APIHRIS/inputSppd", dataForm)
        .then(res => {
            responseAPI = res.data;
            if (responseAPI.status == "1") {
                console.log("Success");
            } else {
                console.log("Failed");
            }
        })
        .catch(err => {
            const statusCode = err.response.status;
                const data = {
                    error: null,
                    statusCode,
                };
                //console.log("error");
                if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
                }
        });
    }

    saveCuti() {
        let dataForm = this.state.cutiField;
        let responseAPI;
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.post(process.env.REACT_APP_SMILE_API + "api/APIHRIS/inputCuti", dataForm)
        .then(res => {
            responseAPI = res.data;
            if (responseAPI.status == "1") {
                console.log("Success");
            } else {
                console.log("Failed");
            }
        })
        .catch(err => {
            const statusCode = err.response.status;
                const data = {
                    error: null,
                    statusCode,
                };
                //console.log("error");
                if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
                }
        });
    }

    handleChange(fieldName, e) {
        let sppdField = this.state.sppdField;
        sppdField[fieldName] = e.target.value;
        this.setState({sppdField});
        console.log(fieldName + ": " + this.state.sppdField[fieldName]);
    }

    handleCutiChange(fieldName, e) {
        let cutiField = this.state.cutiField;
        cutiField[fieldName] = e.target.value;
        this.setState({cutiField});
        console.log(fieldName + ": " + this.state.cutiField[fieldName]);
    }

    render() {
        const penginapan = this.state.penginapan;
        const kota = this.state.kota;
        const aktivitas = this.state.aktivitas;
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                {/*Modal SPPD*/}
                <div className="modal" id="SPPDModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form SPPD</h4>
                            </div>

                            <div className="modal-body">
                                <form name="formSppd" onSubmit={this.handleSubmit.bind(this, "formsppd")}>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="tgl_berangkat">Tanggal Berangkat</label>
                                            <input type="date" className="form-control" id="tgl_berangkat" ref="dep_date" name="dep_date" onChange={this.handleChange.bind(this, "dep_date")} value={this.state.sppdField["dep_date"]}/>
                                        </div>
                                        <label htmlFor="jam_berangkat">Jam Berangkat</label>
                                        <input type="time" className="form-control" id="jam_berangkat" ref="dep_time" name="dep_time" onChange={this.handleChange.bind(this, "dep_time")} value={(typeof this.state.sppdField["dep_time"] !== "undefined") ? this.state.sppdField["dep_time"] : "17:00"}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tgl_pulang">Tanggal Pulang</label>
                                        <input type="date" className="form-control" id="tgl_pulang" ref="arr_date" name="arr_date" onChange={this.handleChange.bind(this, "arr_date")} value={(this.state.sppdField["arr_date"])}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jam_pulang">Jam Pulang</label>
                                        <input type="time" className="form-control" id="jam_pulang" ref="arr_time" name="arr_time" onChange={this.handleChange.bind(this, "arr_time")} value={(typeof this.state.sppdField["arr_time"] !== "undefined") ? this.state.sppdField["arr_time"] : "17:00"}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kota_tujuan">Kota Tujuan</label>
                                        <select className="form-control" id="kota_tujuan" ref="city" onChange={this.handleChange.bind(this, "city")}>
                                        {kota.map((anObjectMapped, index) => {
                                            return (
                                                <option value={anObjectMapped.id_m_city}>{anObjectMapped.city}</option>
                                            );
                                        })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="penginapan">Penginapan</label>
                                        {/*<input type="text" className="form-control" id="penginapan" />*/}
                                        <select className="form-control" id="penginapan" ref="penginapan" onChange={this.handleChange.bind(this, "penginapan")}>
                                        {penginapan.map((anObjectMapped, index) => {
                                            return (
                                                <option value={anObjectMapped.id_m_enterprise}>{anObjectMapped.text25}</option>
                                            );
                                        })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dinas">Dinas</label>
                                        {/*<input type="text" className="form-control" id="dinas" />*/}
                                        <p className="form-control">Dinas Dalam Negeri</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="aktifitas">Aktivitas</label>
                                        {/*<input type="text" className="form-control" id="aktivitas" />*/}
                                        <select className="form-control" id="aktifitas" ref="aktifitas" onChange={this.handleChange.bind(this, "aktifitas")}>
                                        {aktivitas.map((anObjectMapped, index) => {
                                            return (
                                                <option value={anObjectMapped.id_m_activity} selected>{anObjectMapped.tktxt}</option>
                                            );
                                        })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="deskripsi">Deskripsi</label>
                                        <input type="text" className="form-control" id="deskripsi" ref="keterangan" placeholder="Masukkan keterangan disini" onChange={this.handleChange.bind(this, "keterangan")} value={this.state.sppdField["keterangan"]}/>
                                    </div>
                                    <button className="btn btn-primary" href="#" name="formSppd" onClick={this.handleSubmit.bind(this, "formSppd")}>Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal Cuti*/}
                <div className="modal" id="CutiModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form Cuti</h4>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="tgl_awal">Tanggal Awal:</label>
                                        <input type="date" className="form-control" id="tgl_awal" name="tgl1" onChange={this.handleCutiChange.bind(this, "tgl1")} value={this.state.cutiField["tgl1"]}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tgl_akhir">Tanggal Akhir:</label>
                                        <input type="date" className="form-control" id="tgl_akhir" name="tgl2" onChange={this.handleCutiChange.bind(this, "tgl2")} value={this.state.cutiField["tgl2"]}/>
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="deskripsi">Deskripsi:</label>
                                        <input type="text" className="form-control" id="deskripsi"/>
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="tempat_cuti">Tempat Cuti:</label>
                                        <input type="text" className="form-control" id="tempat_cuti" name="addr" onChange={this.handleCutiChange.bind(this, "addr")} value={this.state.cutiField["addr"]}/>
                                    </div>
                                    <button className="btn btn-primary" href="#" onClick={this.handleSubmit.bind(this, "formCuti")}>Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal Email*/}
                <div className="modal" id="EmailModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form Email</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" className="form-control" id="pwd"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal Buku*/}
                <div className="modal" id="BukuModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form Buku Telepon</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" className="form-control" id="pwd"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal NDO*/}
                <div className="modal" id="NDOModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form NDO</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div class="form-group">
                                        <label for="email">Email address:</label>
                                        <input type="email" class="form-control" id="txtemail"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Password:</label>
                                        <input type="password" class="form-control" id="txtpassword"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="slidetiga">
                    <div className="container-fluid">
                        <div className="title-slidetiga">
                            <h2>SMI Office</h2>
                            <p>{/* Deskripsi */}</p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="content-smi-office">
                                    <div className="container">
                                        <center>
                                            <div>
                                                <Slider {...settings}>

                                                    <div className="office-box">
                                                        <m data-toggle="modal" data-target="#SPPDModal">
                                                            <div className="logo-box">
                                                                <i className="material-icons">person</i>
                                                            </div>
                                                            <h3>SPPD</h3>
                                                        </m>
                                                    </div>

                                                    <div className="office-box">
                                                        <m data-toggle="modal" data-target="#CutiModal">
                                                            <div className="logo-box">
                                                                <i className="material-icons">account_balance</i>
                                                            </div>
                                                            <h3>Cuti</h3>
                                                        </m>
                                                    </div>

                                                    <div className="office-box">
                                                        <NavLink href={"http://webmail1.semenindonesia.com/"}
                                                                 target="_blank">
                                                            <div className="logo-box">
                                                                <i className="material-icons">email</i>
                                                            </div>
                                                            <h3>Email</h3>
                                                        </NavLink>
                                                    </div>
                                                    <div className="office-box">
                                                        <NavLink
                                                            href={process.env.REACT_APP_ROOT + "bukutelepon"}>
                                                            <div className="logo-box">
                                                                <i className="material-icons">library_books</i>
                                                            </div>
                                                            <h3>Buku Telepon</h3>
                                                        </NavLink>
                                                    </div>
                                                    <div className="office-box">
                                                        <NavLink href={"http://ndo.semenindonesia.com"}
                                                        target="_blank">
                                                            <div className="logo-box">
                                                                <i className="material-icons">headset_mic</i>
                                                            </div>
                                                            <h3>NDO</h3>
                                                        </NavLink>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Content Menu */}
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideTiga;
