import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            email: '',
            password: '',
            message: '',
            styleName: '',
            isChecked: false
        }
    }
    
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
        console.log(e);
    }

    handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        let { name, email, password, isChecked } = this.state;
        if(name === '' || email === '' || password === '') {
            this.setState({message: 'Enter all the details', styleName: 'danger'});
        }  else {
            if(!email.includes(".")) {
                this.setState({message: 'Please enter valid email', styleName: 'danger'});
            } else if(!isChecked) {
                this.setState({message: 'Please accept terms and conditions', styleName: 'danger'});
            } else {
                const {
                    userName, email, password, isChecked
                } = this.state;
                let requestBody = {
                    userName, email, password, isChecked
                }
                axios.post('http://localhost:4000/login', requestBody).then(res => {
                    this.setState({message: res.data, styleName: 'success'});
                    setTimeout(() => {this.props.history.replace("/addProduct")}, 2000);
                }).catch(err => {
                    this.setState({message: 'Failed to Log In', styleName: 'danger'});
                });
            }
        }
    }
    handleCheckboxChange = (e) => {
        this.setState({isChecked: e.target.checked});
    }
    render() {
        let formContainer = {
            display: "block",
            marginTop: "10%",
            textAlign: "center",
        };
        let formCss = {
            width: "50%",
            border: "1px solid red",
            padding: "35px",
            display: "inline-block"
        }

        return (
            <React.Fragment>
                <div style={formContainer}>
                    <h2>Login Form</h2>
                    <form onSubmit={this.handleSubmit} style={formCss}>
                        <div className="form-group">
                            <label htmlFor="userName" style={{float: "left"}}>User Name:</label>
                            <input className="form-control" type="text" name="userName" id="userName"
                            placeholder="Enter User Name" value={this.state.userName}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" style={{float: "left"}}>Email:</label>
                            <input className="form-control" type="email" name="email" id="email"
                                onChange={this.handleChange} value={this.state.email}
                                placeholder="Enter Email Id"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{float: "left"}}>Password:</label>
                            <input className="form-control" type="password" placeholder="Enter password"
                            onChange={this.handleChange} value={this.state.password} name="password" 
                            id="password"/>
                        </div>
                        <div className="form-group" style={{width: "100%"}}>
                            <input type="checkbox" className="form-control"  style={{width: "5%", height: "20px", position: 'relative', float: "left"}}
                            checked={this.state.isChecked} onChange={this.handleCheckboxChange}/>
                            <span style={{width:'95%',  textAlign: 'left', position: 'relative', float: "left"}}><b>Accept all terms and conditions</b></span>
                        </div> 
                        {this.state.message !== ''? <div className={`text text-${this.state.styleName}`}><b>{this.state.message}</b><br/><br/></div>: null}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;