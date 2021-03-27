import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="Navbar">
            <b><Link to="/" style={{ color: 'white' }}>IconicSite</Link></b>&nbsp;&nbsp;
            <Link style={{ color: 'white' }} to="/home">Home</Link>&nbsp;&nbsp;
            <Link style={{ color: 'white' }} to="/products">All Products</Link>&nbsp;&nbsp;
        </div>
    )
}
export default Navigation;