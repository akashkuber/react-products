import React from 'react';
import axios from "axios";
import ProductList from './ProductList';
class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        };
    }
    componentDidMount = () => {
        axios.get('http://localhost:4000/products').then(res => {
            const { data } = res.data;
            this.setState({ products: data });
        });
    }

    addProduct = () => {
        this.props.history.replace('/addProduct');
    }

    updateProduct = id => {
        this.props.history.replace(`/editProduct/${id}`);
    }

    deleteProduct = id => {
        console.log(id)
        alert("Delete product?");
        axios.delete(`http://localhost:4000/product/${id}`).then(() => {
            this.componentDidMount();
        }).catch();
    }

    render() {
        const productsList = this.state.products.length > 0
            ? <ProductList products={this.state.products} addProduct={this.addProduct}
                updateProduct={this.updateProduct} deleteProduct={this.deleteProduct} />
            : <div className="text text-danger" style={{ textAlign: 'center' }}><b>No data found</b>
                    <br/><br/><button className="btm btn-primary" onClick={this.addProduct}>Add Product</button>
                </div>
        return (
            <React.Fragment>
                <h1>Product List</h1>
                {productsList}
            </React.Fragment>
        )
    }
}

export default Products;