import React from 'react'
import {
    Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function Header() {
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