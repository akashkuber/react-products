import { Link } from 'react-router-dom';
const ProductList = (props) => {
    
    return <table className="table">
        <thead className="thead">
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Online Status</th>
                <th>Size</th>
                <th>Date</th>
                <th>View Details</th>
                <th>Add</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>

        </thead>
        <tbody className="tbody">
            {props.products.map(item => {
                const viewProduct = `/products/${item.id}`;
                return <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.productDescription}</td>
                    <td style={{color: item.isOnline ? 'green': 'red'}}>{item.isOnline ? 'Open' : 'Close'}</td>
                    <td>{item.productSize}</td>
                    <td>{item.productDate}</td>
                    <td><Link to={viewProduct}>View</Link></td>
                    <td><button className="btn btn-warning"  onClick={props.addProduct}>Add</button></td>
                    <td><button className="btn btn-primary" onClick={() => props.updateProduct(item.id)}>Update</button></td>
                    <td><button className="btn btn-danger" onClick={() => props.deleteProduct(item.id)}>Delete</button></td>
                </tr>
            }
            )}
        </tbody>
    </table>
}
export default ProductList;