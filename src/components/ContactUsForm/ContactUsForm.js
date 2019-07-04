import React from "react";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import Http from "../../Http";

class ContactUsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactus: {
                nama: "",
                email: "",
                phone: "",
                category: "",
                subject: "",
                message: ""
            }
        }
    }

    componentDidMount() {
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
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
                                    <Input type="text" name="nama" id="nama" placeholder="Please insert your name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Please insert your email" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <Input type="text" name="phone" id="phone" placeholder="Your Phone Number" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Category</Label>
                                    <Input type="select" name="category" id="category">
                                        <option disabled selected>Choose one option</option>
                                        <option value="Kritik">Kritik</option>
                                        <option value="Saran">Saran</option>
                                        <option value="Request">Request</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="subject">Subject</Label>
                            <Input type="text" name="subject" id="subject"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">Message</Label>
                            <Input type="textarea" name="message" id="message" bsSize="lg"/>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ContactUsForm;