import React from 'react'
import { Link } from "react-router-dom"
import '../style.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        {/* <i className='fas fa-sign-out-alt' style={{ fontSize: '24px' }}></i> */}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
