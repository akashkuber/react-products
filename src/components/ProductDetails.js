import axios from 'axios';
import React from 'react';

class ProductsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        };

    }
    componentDidMount = () => {
        let paramId = this.props.match.params.id;
        axios.get(`http://localhost:4000/product/${paramId}`).then(res => {
            const { data } = res.data;
            this.setState({ product: data })
        })
    }
    render() {
        let data = null;
        if (this.state.product.length === 1) {
            data = this.state.product.map(item =>
                <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.productDescription}</td>
                    <td>{item.productSize}</td>
                    <td style={{color: item.isOnline ? 'green': 'red'}}>{item.isOnline ? 'Open' : 'Close'}</td>
                    <td>{item.productDate}</td>
                </tr>
            )
        } else {
            data = <tr><td></td><td></td><td className="text text-danger"><b>No data found</b></td><td></td><td></td></tr>
        }

        return (
            <React.Fragment>
                <h1>Product Detail</h1>
                <table className="table" style={{ width: '100%' }}>
                    <thead className="thead">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Size</th>
                            <th>Online Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{data}</tbody></table>
            </React.Fragment>
        )
    }
}

export default ProductsDetails;