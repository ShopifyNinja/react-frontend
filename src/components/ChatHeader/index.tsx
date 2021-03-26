import React from 'react'
import {
    Grid,
} from '@material-ui/core';

function ChatHeader() {
    return (
        <Grid container className="header-container">
            <Grid item xs={4} className="row-container header-left">
                <div className="row-container">
                    <div className="text-25">BTC/TRY</div>
                    <div className="text-11">+1.92%</div>
                </div>
                <div className="row-container" style={{ paddingLeft: 10 }}>
                    <div className="color-blue text-15">Bitcoin</div>
                    <div className="text-25 color-blue">413.437</div>
                </div>
            </Grid>
            <Grid item xs={8} className="header-right">
                <div className="row-container" style={{ marginBottom: 20 }}>
                    <div className="text-11">24 / Değişim</div>
                    <div className="text-11">24 / En Yüksek</div>
                    <div className="text-11">24 / En Düşük</div>
                    <div className="text-11">24 / Hacim</div>
                </div>
                <div className="row-container">
                    <div className="text-12">7.803 +1.92%</div>
                    <div className="text-12">417.611</div>
                    <div className="text-12">403.611</div>
                    <div className="text-12">460.20</div>
                </div>
            </Grid>
        </Grid>
    )
}

export default ChatHeader;