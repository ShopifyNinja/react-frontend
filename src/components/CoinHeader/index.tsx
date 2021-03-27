import React from 'react'
import {
    Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className="coin-container item">
                <Button variant="contained" className="recenttrades-btn">
                    TRY
                </Button>
                <Button variant="contained" className="recenttrades-btn1">
                    USDT
                </Button>
                <Button variant="contained" className="recenttrades-btn1">
                    BTC
                </Button>
                <div>
                    <Button
                        variant="contained"
                        className="recenttrades-btn1"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        style={{ display: 'flex' }}
                    >
                        ETH
                        <ExpandMoreIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>XRP</MenuItem>
                        <MenuItem onClick={handleClose}>BTT</MenuItem>
                    </Menu>
                </div>
                <Button variant="contained" className="recenttrades-btn1">
                    ETH
                </Button>
            </div>
            <div className="search item">
                <SearchIcon style={{ margin: '1.3rem' }} />
                <input
                    className="search-form"
                    placeholder="Hızlı bir arama yapın"
                />
            </div>
        </div>
    )
}

export default Header;