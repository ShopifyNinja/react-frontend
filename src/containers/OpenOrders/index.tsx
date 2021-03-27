import classnames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../..';
import {
    Market,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    RootState,
    selectCancelOpenOrdersFetching,
    selectCurrentMarket,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
    selectUserLoggedIn,
    userOpenOrdersFetch,
} from '../../modules';
import { OrderCommon } from '../../modules/types';
import {
    Grid,
    Button
} from '@material-ui/core';

interface ReduxProps {
    currentMarket: Market | undefined;
    list: OrderCommon[];
    fetching: boolean;
    cancelFetching: boolean;
    userLoggedIn: boolean;
}

interface SetupFormState {
    al_price: string;
    al_amount: string;
    al_total: string;
    sat_price: string;
    sat_amount: string;
    sat_total: string;
}

interface DispatchProps {
    userOpenOrdersFetch: typeof userOpenOrdersFetch;
    openOrdersCancelFetch: typeof openOrdersCancelFetch;
    ordersCancelAll: typeof ordersCancelAllFetch;
}

type Props = ReduxProps & DispatchProps & IntlProps;

export class OpenOrdersContainer extends React.Component<Props, SetupFormState> {
    constructor(props) {
        super(props);
        this.state = {
            al_price: '413.437.00',
            al_amount: '413.437.00',
            al_total: '413.437.00',
            sat_price: '413.437.00',
            sat_amount: '413.437.00',
            sat_total: '413.437.00'
        }
    }

    public componentDidMount() {
        const { currentMarket, userLoggedIn } = this.props;
        if (userLoggedIn && currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }

    public componentWillReceiveProps(next: Props) {
        const { userLoggedIn, currentMarket } = next;
        const { userLoggedIn: prevUserLoggedIn, currentMarket: prevCurrentMarket } = this.props;

        if (!prevUserLoggedIn && userLoggedIn && currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        } else if (userLoggedIn && currentMarket && prevCurrentMarket !== currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }

    public render() {
        const { al_price, al_total, al_amount, sat_price, sat_amount, sat_total } = this.state;
        const { list, fetching } = this.props;

        return (
            <div className="pg-open-orders--empty">
                <div className="row-container" style={{ marginTop: 15, marginBottom: 20 }}>
                    <div className="btn-limit">{this.translate('page.body.openOrders.header.button.limit')}</div>
                    <div className="btn-market">{this.translate('page.body.openOrders.header.button.market')}</div>
                    <div className="btn-market">{this.translate('page.body.openOrders.header.button.stopLimit')}</div>
                </div>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ paddingRight: 10 }}>
                        <div className="row-container" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                            <div className="fontsize-15">BTC AL</div>
                            <div className="fontsize-12" style={{ color: '#7A7C83' }}>Bakiye : 50.000 ₺</div>
                        </div>
                        <div className="row-container column-item">
                            <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                                <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.pair')}</div>
                                <div className="btn-maximum">
                                    {this.translate('page.body.openOrders.header.button.bring')}
                                </div>
                            </div>
                            <input
                                className="input-form"
                                value={al_price}
                                onChange={(e) => { this.setState({ al_price: e.target.value }) }}
                            />
                        </div>
                        <div className="row-container column-item">
                            <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                                <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.price')}</div>
                                <div className="btn-maximum">
                                    {this.translate('page.body.openOrders.header.button.maximum')}
                                </div>
                            </div>
                            <input
                                className="input-form"
                                value={al_amount}
                                onChange={(e) => { this.setState({ al_amount: e.target.value }) }}
                            />
                        </div>
                        <div className="row-container column-item">
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.last_price')}</div>
                            <input
                                className="input-form al-total"
                                value={al_total}
                                onChange={(e) => { this.setState({ al_total: e.target.value }) }}
                            />
                        </div>
                        <Button variant="contained" color="primary" className="btn-btc-al">
                            BTC AL
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ paddingLeft: 10 }}>
                        <div className="row-container" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                            <div className="fontsize-15">BTC SAT</div>
                            <div className="fontsize-12" style={{ color: '#7A7C83' }}>Bakiye : 0.0410021 BTC</div>
                        </div>
                        <div className="row-container column-item">
                            <div className="row-container" style={{ justifyContent: 'space-between', width: '50%' }}>
                                <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.pair')}</div>
                                <div className="btn-maximum">
                                    {this.translate('page.body.openOrders.header.button.bring')}
                                </div>
                            </div>
                            <input
                                className="input-form"
                                value={sat_price}
                                onChange={(e) => { this.setState({ sat_price: e.target.value }) }}
                            />
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
                            <input
                                className="input-form"
                                value={sat_amount}
                                onChange={(e) => { this.setState({ sat_amount: e.target.value }) }}
                            />
                        </div>
                        <div className="row-container column-item">
                            <div className="fontsize-12">{this.translate('page.body.trade.header.markets.content.last_price')}</div>
                            <input
                                className="input-form sat-total"
                                value={sat_total}
                                onChange={(e) => { this.setState({ sat_total: e.target.value }) }}
                            />
                        </div>
                        <Button variant="contained" color="primary" className="btn-btc-sat">
                            BTC AL
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private translate = (e: string) => this.props.intl.formatMessage({ id: e });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    list: selectOpenOrdersList(state),
    fetching: selectOpenOrdersFetching(state),
    cancelFetching: selectCancelOpenOrdersFetching(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
    openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
    ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});

export type OpenOrdersProps = ReduxProps;

export const OpenOrdersComponent = injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(OpenOrdersContainer),
) as React.FunctionComponent;
