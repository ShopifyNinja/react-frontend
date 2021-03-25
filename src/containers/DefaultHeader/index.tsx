import React from 'react';
import { Logo } from '../../components';
import { NavBar } from '../NavBar';
import {
    Button,
    Menu
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom'

const DefaultHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header className="pg-header">
            <div className={`pg-container pg-header__content`}>
                <div className="pg-header__logo">
                    <Logo />
                </div>
                <div className="pg-header__navbar">
                    <div className="menu-item">ASCOINDEX</div>
                    <div
                        className="menu-item"
                        onClick={() => { history.push('/trading') }}
                    >AL-SAT</div>
                    <div className="menu-item">DESTEK</div>
                    <div className="menu-item">ORTAKLIK</div>
                    <div className="menu-item">BLOG</div>
                    <div className="menu-item">
                        <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ display: 'flex' }}>
                            TR
                            <ExpandMoreIcon />
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>TR</MenuItem>
                            <MenuItem onClick={handleClose}>EN</MenuItem>
                        </Menu>
                    </div>
                    <Button variant="contained" className="menu-item btn-login">
                        Giriş Yap
                    </Button>
                    <Button variant="contained" className="menu-item btn-register">
                        Hesap Oluştur
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default DefaultHeader;
