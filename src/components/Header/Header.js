import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedinUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <ul>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/review">Order Review</Link></li>
                    <li><Link to="/manage">Manage Inventory</Link></li>
                    <li style={{color:'gray'}}>{loggedInUser.email}</li>
                    <li><button onClick={() => setLoggedinUser({})}>Sign Out</button></li>
                </ul>
            </nav>

        </div>
    );
};

export default Header;