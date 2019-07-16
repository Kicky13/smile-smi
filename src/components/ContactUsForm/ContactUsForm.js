import React from "react";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import Http from "../../Http";
import ReeValidate from "ree-validate";
import Swal from "sweetalert2";

class ContactUsForm extends React.Component {
    constructor() {
        super();
        this.validator = new ReeValidate({
            nama: 'required|min:6',
            email: 'required|email',
            phone: 'required|numeric',
            pesan: 'required|min:3',
            kategori: 'required'
        });

        this.state = {
            contactus: {
                nama: "",
                email: "",
                phone: "",
                kategori: "",
                pesan: ""
            },
            errors: this.validator.errors
        }
    }

    submit() {
        const { contactus } = this.state;
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.post(process.env.REACT_APP_SMILE_API + "api/Main/contactus", contactus)
        .then(res => {
            console.log(res.data);
            window.location.reload();
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

    validateAndSubmit(e) {
        e.preventDefault();

        const { contactus } = this.state;
        const { errors } = this.validator;

        this.validator.validateAll(contactus)
        .then(success => {
            if(success) {
                console.log("success");
                Swal.fire({
                    type: 'success',
                    title: 'Terima Kasih',
                    text: 'Anda telah submit kritik dan saran anda'
                });
                this.submit();
            } else {
                console.log("failed");
                this.setState({ errors });
            }
        });
    }

    handleChange(event) {
        event.preventDefault();

        const { contactus } = this.state;
        const { errors } = this.validator;
        const name = event.target.name;
        const value = event.target.value;
        contactus[name] = value;

        this.setState({ errors, contactus })

        console.log(name + ": " + value);
    }

    render() {
        const styleHeader = {
            marginBottom: "0px",
        };
        const styleSubheader = {
            color: "black",
            marginBottom: "2px",
            fontSize: "12px",
        };
        const styleAlert = {
            fontSize: "10px",
            fontWeight: 'normal',
            color: "#e50006",
            fontStyle: 'italic',
        }
        const { errors, contactus } = this.state;
        return (
            <div>
                <div className="contact-us-header">
                    <h3 style={styleHeader}>Contact Us</h3>
                    <p style={styleSubheader}>We love to hear from you. Use the form below to contact us</p>
                    <hr></hr>
                </div>
                <div className="contact-us-content">
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="nama">Full Name</Label>
                                    <Input type="text" name="nama" id="nama" placeholder="Please insert your name" value={contactus["nama"]} onChange={this.handleChange.bind(this)} />
                                    { errors.has('nama') && <Label style={styleAlert} for="nama-error" id="nama-error">{errors.first('nama')}</Label> }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Please insert your email" value={contactus["email"]} onChange={this.handleChange.bind(this)} />
                                    { errors.has('email') && <Label style={styleAlert} for="email-error" id="email-error">{errors.first('email')}</Label> }
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <Input type="text" name="phone" id="phone" placeholder="Your Phone Number" value={contactus["phone"]} onChange={this.handleChange.bind(this)} />
                                    { errors.has('phone') && <Label style={styleAlert} for="phone-error" id="phone-error">{errors.first('phone')}</Label> }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="kategori">Category</Label>
                                    <Input type="select" name="kategori" id="kategori" onChange={this.handleChange.bind(this)} >
                                        <option disabled selected>Choose one option</option>
                                        <option value="Kritik">Kritik</option>
                                        <option value="Saran">Saran</option>
                                        <option value="Request">Request</option>
                                    </Input>
                                    { errors.has('kategori') && <Label style={styleAlert} for="kategori-error" id="kategori-error">{errors.first('kategori')}</Label> }
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="pesan">Message</Label>
                            <Input type="textarea" name="pesan" id="pesan" bsSize="lg" value={contactus["pesan"]} onChange={this.handleChange.bind(this)} />
                            { errors.has('pesan') && <Label style={styleAlert} for="pesan-error" id="pesan-error">{errors.first('pesan')}</Label> }
                        </FormGroup>
                        <Button onClick={this.validateAndSubmit.bind(this)}>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ContactUsForm;