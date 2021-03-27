import './App.css';
import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Navigation from './components/Navigation';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation/>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route exact path="/products" component={Products}/>
          <Route path="/products/:id" component={ProductDetails}/>
          <Route path="/editProduct/:id" component={EditProduct}/>
          <Route path="/addProduct" component={AddProduct}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
