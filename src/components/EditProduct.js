import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
class EditProduct extends React.Component {
    constructor() {
        super();
        let today = new Date();
        let month = today.getMonth() + 1;
        if(month <= 9) month = 0 + '' + month;
        let date = today.getFullYear() + '-' + month + '-' + today.getDate();
        this.state = {
            id: this.randstr(''),
            productName: '',
            productDescription: '',
            productSize: 'S',
            productDate: date,
            isOnline: false,
        }
    }
    componentDidMount = () => {
        let paramId = this.props.match.params.id;
        axios.get(`http://localhost:4000/product/${paramId}`).then(res => {
            const { data } = res.data;
            if(data.length > 0) {
                let product = data[0];
                console.log(product)
                this.setState({
                    ...product
                });
            }
            
        })
    }
    randstr = (prefix) => {
        return Math.random().toString(36).replace('0.', prefix || '');
    }
    handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.state.id;
        console.log(this.state);
        axios.put(`http://localhost:4000/product/${id}`, this.state).then(res => {
            alert(`Product updated successfully!`);
            this.setState({
                id: '',
                productName: '',
                productDescription: '',
                productSize: 'S',
                productDate: '',
                isOnline: false,
            });
            this.props.history.replace('/products');
        });
    }
    render() {
        let labelText = {
            float: 'left',
            fontWeight: 'bold',
        }
        let checkboxCss = {
            fontWeight: 'bold',
            position: 'relative',
            float: 'left',
            width: '100%',
        }
        let checkedInput = {
            float: 'left',
            position: 'relative',
            width: '10%',
            height: '30px'
        }
        let checkLabel = {
            float: 'left'
        }
        return (
            <React.Fragment>
                <h2>Update Products</h2>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-5">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="productName" style={labelText}>Product Name:</label>
                                <input className="form-control" name="productName"
                                    id="productname" value={this.state.productName} required
                                    onChange={this.handleChange} placeholder="Enter product name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription" style={labelText}>Description:</label>
                                <textarea className="form-control" name="productDescription" id="productDescription"
                                    onChange={this.handleChange} value={this.state.productDescription} required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productSize" style={labelText}>Product Size:</label>
                                <select className="form-control" name="productSize" id="productSize"
                                    value={this.state.productSize} onChange={this.handleChange}>
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDate" style={labelText}>Date:</label>
                                <input className="form-control" type="date" name="productDate"
                                    id="productDate" value={this.state.productDate}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group" style={checkboxCss}>
                                <input className="form-control" style={checkedInput} type="checkbox" name="isOnline"
                                    checked={this.state.isOnline} id="isOnline"
                                    onChange={this.handleChange} />
                                <label htmlFor="productOnline" style={checkLabel}>send Online</label>
                            </div>
                            <button type="submit" value="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditProduct;