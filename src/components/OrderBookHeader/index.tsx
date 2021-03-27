import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Imgcircleright from 'src/assets/images/icons/circle-right.svg';
import Imgcircleleft from 'src/assets/images/icons/circle-left.svg';

function Header() {
    return (
        <Grid container className="header-container">
            <div style={{ alignSelf: 'center' }}>
                <div className="text-11">BTC/USD</div>
                <div className="text-15">$51.437</div>
            </div>
            <div className="header-middle" style={{ alignSelf: 'center' }}>
                <div className="text-11">BTC/USD</div>
                <div className="text-15">€31.437</div>
            </div>
            <div style={{ alignSelf: 'center' }}>
                <div className="text-11" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    BTC/USD
                    <img src={Imgcircleleft} className="img-circle" />
                    <img src={Imgcircleright} className="img-circle" />
                </div>
                <div className="text-15">0.031302 BTC</div>
            </div>
        </Grid>
    )
}

export default Header;
