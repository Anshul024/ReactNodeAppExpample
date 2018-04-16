import React from 'react';
var ReactDOM = require('react-dom');
import { Table, Glyphicon } from 'react-bootstrap';
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    callFirstApi() {
        var $this = this;
        fetch("http://localhost:8081/getProducts")
            .then(function (res, err) {
                return res.json()
            }).then(function (res, err) {
                $this.setState({ products: res });
            });
    }

    componentDidMount() {
        this.callFirstApi();
    }

    render() {
        return (
            <div>
                <h2>Product List</h2>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, key) =>
                            <tr>
                                <td>{key + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td><img style={{width: "18%"}} src={product.url} /></td>
                                <td>
                                    <a href={"/#/About/"+product._id}>
                                        <Glyphicon glyph="edit" /></a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Home;