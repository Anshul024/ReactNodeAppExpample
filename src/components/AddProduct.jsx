import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';
class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: 0,
            quantity: 0
        }
    }
  
    componentDidMount() {
        if (this.props.match.params.id) {
            this.getProductDetailById();
        }
    }
    getProductDetailById() {
        var $this = this;
        fetch("http://localhost:8081/getProductDetailById/" + this.props.match.params.id)
            .then(function (res, err) {
                return res.json()
            }).then(function (res, err) {
                if (res.length > 0) {

                    $this.setState({
                        title: res[0].title,
                        price: res[0].price,
                        url: res[0].url,
                        quantity: res[0].quantity,
                    });
                } else {
                    alert("Data could not find")
                }

            });
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleFileChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    handleSubmit(e) {
        var $this = this;
        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('title', this.state.title);
        formData.append('price', this.state.price);
        formData.append('quantity', this.state.quantity);
        fetch("http://localhost:8081/saveProduct", {
            method: 'POST',
            body: formData
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            if (body.ok == 1) {
                $this.props.history.push('/')
            }
            else {
                alert("Data could not save")
            }
        });
    }

    handleEdit(e) {
        var $this = this;
        var formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('id', this.props.match.params.id);
        formData.append('title', this.state.title);
        formData.append('price', this.state.price);
        formData.append('quantity', this.state.quantity);
        formData.append('url', this.state.url);
        fetch("http://localhost:8081/updateProduct", {
            method: 'POST',
            body: formData
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.ok == 1) {
                    $this.props.history.push('/')
                }
                else {
                    alert("Data could not updated")
                }
            });
    }

    deleteProductDetailById() {
        var $this = this;
        fetch("http://localhost:8081/deleteProductDetailById/" + this.props.match.params.id)
            .then(function (res, err) {
                return res.json()
            }).then(function (res, err) {
                if (res.ok == 1) {
                    $this.props.history.push('/')
                }
                else {
                    alert("Data could not delete")
                }
            });
    }
    render() {
        return (
            <div>
                <h2>Product Detail</h2>
                <form id="formPoduct" ref="formPoduct" noValidate>
                    <Col xs={5} className="col-sm-offset-3">
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl name="title" type="text" value={this.state.title}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter text" required />
                        </FormGroup>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Price</ControlLabel>
                            <FormControl name="price" type="number" value={this.state.price}
                                onChange={this.handleChange.bind(this)} maxLength="8"
                                placeholder="Enter text" required />
                        </FormGroup>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Quantity</ControlLabel>
                            <FormControl name="quantity" type="number" value={this.state.quantity}
                                onChange={this.handleChange.bind(this)} maxLength="4"
                                placeholder="Enter text" required />
                        </FormGroup>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Image</ControlLabel>
                            <FormControl name="file" type="file" placeholder="Enter text"
                                onChange={this.handleFileChange.bind(this)}
                                required />
                        </FormGroup>
                        {!this.state.file && <FormGroup controlId="formBasicText">
                            <img src={this.state.url} style={{ width: "17%" }} />
                        </FormGroup>}
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>&nbsp;</ControlLabel>
                            {!this.props.match.params.id && <Button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</Button>}
                            {this.props.match.params.id && <Button className="btn btn-primary" onClick={this.handleEdit.bind(this)}>Edit</Button>}
                            {this.props.match.params.id && <Button className="btn btn-warning" onClick={this.deleteProductDetailById.bind(this)}>Delete</Button>}
                            <a className="btn btn-warning" href="/#/">Cancel</a>
                        </FormGroup>
                    </Col>
                </form>
            </div>
        );
    }
}
export default AddProduct;