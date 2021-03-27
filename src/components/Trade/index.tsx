import React from 'react'
import {
    Grid,
    Button
} from '@material-ui/core';

function Trade() {
    return (
        <div className="pg-open-orders--empty">
            <div className="row-container">
                <div className="btn-limit">{this.translate('page.body.openOrders.header.button.limit')}</div>
                <div className="btn-market">{this.translate('page.body.openOrders.header.button.market')}</div>
                <div className="btn-market">{this.translate('page.body.openOrders.header.button.stopLimit')}</div>
            </div>
            <Grid container>
                <Grid item xs={12} md={6} style={{ paddingRight: 10 }}>
                    <div className="row-container" style={{ justifyContent: 'space-between' }}>
                        <div className="fontsize-15">BTC AL</div>
                        <div className="fontsize-12">Bakiye : 50.000 ₺</div>
                    </div>
                    <div className="row-container column-item">
                        <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.pair')}</div>
                            <div className="btn-maximum">
                                {this.translate('page.body.openOrders.header.button.bring')}
                            </div>
                        </div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <div className="row-container column-item">
                        <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.price')}</div>
                            <div className="btn-maximum">
                                {this.translate('page.body.openOrders.header.button.maximum')}
                            </div>
                        </div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <div className="row-container column-item">
                        <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.last_price')}</div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <Button variant="contained" color="primary" className="btn-btc-al">
                        BTC AL
                        </Button>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingLeft: 10 }}>
                    <div className="row-container" style={{ justifyContent: 'space-between' }}>
                        <div className="fontsize-15">BTC SAT</div>
                        <div className="fontsize-12">Bakiye : 0.0410021 BTC</div>
                    </div>
                    <div className="row-container column-item">
                        <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.pair')}</div>
                            <div className="btn-maximum">
                                {this.translate('page.body.openOrders.header.button.bring')}
                            </div>
                        </div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <div className="row-container column-item">
                        <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.price')}</div>
                            <div className="btn-small">
                                %25
                                </div>
                            <div className="btn-small">
                                %50
                                </div>
                            <div className="btn-small">
                                %75
                                </div>
                            <div className="btn-small">
                                %100
                                </div>
                        </div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <div className="row-container column-item">
                        <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.last_price')}</div>
                        <input value="413.437.00" className="input-form" />
                    </div>
                    <Button variant="contained" color="primary" className="btn-btc-sat">
                        BTC AL
                        </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Trade;