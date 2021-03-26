import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { incrementalOrderBook } from '../../api';
import { Decimal } from '../../components/Decimal';
import { GridChildInterface, GridItem } from '../../components/GridItem';
import {
    Charts,
    MarketsComponent,
    OpenOrdersComponent,
    OrderBook,
    OrderComponent,
    RecentTrades,
    ToolBar,
} from '../../containers';
import { getUrlPart, setDocumentTitle } from '../../helpers';
import {
    RootState,
    selectCurrentMarket,
    selectMarketTickers,
    selectUserInfo,
    selectUserLoggedIn,
    setCurrentMarket,
    setCurrentPrice,
    Ticker,
    User,
} from '../../modules';
import { GridLayoutState, saveLayouts, selectGridLayoutState } from '../../modules/public/gridLayout';
import { Market, marketsFetch, selectMarkets } from '../../modules/public/markets';
import { depthFetch } from '../../modules/public/orderBook';
import { rangerConnectFetch, RangerConnectFetch } from '../../modules/public/ranger';
import { RangerState } from '../../modules/public/ranger/reducer';
import { selectRanger } from '../../modules/public/ranger/selectors';
import { NavBar } from 'src/containers/NavBar';
import {
    Grid,
    Button
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridLayout from 'react-grid-layout';
const { WidthProvider, Responsive } = require('react-grid-layout');

function createData(history, market, medicine, operation, stopPrice, price, amount, total1, remainder, actual, total2) {
    return { history, market, medicine, operation, stopPrice, price, amount, total1, remainder, actual, total2 };
}

const rows = [
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
];

const breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols = {
    lg: 20,
    md: 5,
    sm: 12,
    xs: 12,
    xxs: 12,
};

const breakpoints1 = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols1 = { lg: 20, md: 10, sm: 6, xs: 4, xxs: 2 };

interface ReduxProps {
    currentMarket: Market | undefined;
    markets: Market[];
    user: User;
    rangerState: RangerState;
    userLoggedIn: boolean;
    rgl: GridLayoutState;
    tickers: {
        [pair: string]: Ticker,
    };
}

interface DispatchProps {
    depthFetch: typeof depthFetch;
    marketsFetch: typeof marketsFetch;
    rangerConnect: typeof rangerConnectFetch;
    setCurrentPrice: typeof setCurrentPrice;
    setCurrentMarket: typeof setCurrentMarket;
    saveLayouts: typeof saveLayouts;
}

interface StateProps {
    orderComponentResized: number;
    orderBookComponentResized: number;
}

const ReactGridLayout = WidthProvider(Responsive);
type Props = DispatchProps & ReduxProps & RouteComponentProps & IntlProps;

const TradingWrapper = props => {
    const { orderComponentResized, orderBookComponentResized, layouts, handleResize, handeDrag } = props;
    const children = React.useMemo(() => {
        const data = [
            {
                i: 1,
                render: () => <OrderBook size={orderComponentResized} />,
            },
            {
                i: 2,
                render: () => <Charts />,
            },
            // {
            //     i: 3,
            //     render: () => <OrderBook />,
            // },
            {
                i: 4,
                render: () => <OpenOrdersComponent />,
            },
            {
                i: 5,
                render: () => <RecentTrades />,
            },
            {
                i: 6,
                render: () => <MarketsComponent />,
            },
        ];

        return data.map((child: GridChildInterface) => (
            <div key={child.i}>
                <GridItem>{child.render ? child.render() : `Child Body ${child.i}`}</GridItem>
            </div>
        ));
    }, [orderComponentResized, orderBookComponentResized]);

    return (
        <ReactGridLayout
            breakpoints={breakpoints}
            cols={cols}
            draggableHandle=".cr-table-header__content, .pg-trading-screen__tab-panel, .draggable-container"
            rowHeight={14}
            layouts={layouts}
            onLayoutChange={() => { return; }}
            margin={[5, 5]}
            onResize={handleResize}
            onDrag={handeDrag}
        >
            {children}
        </ReactGridLayout>
    );
};

class Trading extends React.Component<Props, StateProps> {
    public readonly state = {
        orderComponentResized: 5,
        orderBookComponentResized: 5,
    };

    public componentDidMount() {
        setDocumentTitle('Trading');
        const { markets, currentMarket, userLoggedIn, rangerState: { connected, withAuth } } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }

        if (currentMarket && !incrementalOrderBook()) {
            this.props.depthFetch(currentMarket);
        }

        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }

        if (userLoggedIn && !withAuth) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }
    }

    public componentWillUnmount() {
        this.props.setCurrentPrice(undefined);
    }

    public componentWillReceiveProps(nextProps) {
        const {
            history,
            markets,
            userLoggedIn,
        } = this.props;

        if (userLoggedIn !== nextProps.userLoggedIn) {
            this.props.rangerConnect({ withAuth: nextProps.userLoggedIn });
        }

        if (markets.length !== nextProps.markets.length) {
            this.setMarketFromUrlIfExists(nextProps.markets);
        }

        if (nextProps.currentMarket) {
            const marketFromUrl = history.location.pathname.split('/');
            const marketNotMatched = nextProps.currentMarket.id !== marketFromUrl[marketFromUrl.length - 1];
            if (marketNotMatched) {
                history.replace(`/trading/${nextProps.currentMarket.id}`);

                if (!incrementalOrderBook()) {
                    this.props.depthFetch(nextProps.currentMarket);
                }
            }
        }

        if (nextProps.currentMarket && nextProps.tickers) {
            this.setTradingTitle(nextProps.currentMarket, nextProps.tickers);
        }
    }

    public render() {
        const { orderComponentResized, orderBookComponentResized } = this.state;
        const { rgl } = this.props;
        return (
            <div className={'pg-trading-screen'}>
                <div className={'pg-trading-wrap'}>
                    <ToolBar />
                    <div data-react-toolbox="grid" className={'cr-grid'}>
                        <div className="cr-grid__grid-wrapper">
                            {/* <Grid container>
                                <Grid item xs={12} md={2}>a</Grid>
                                <Grid item xs={12} md={6}>a</Grid>
                                <Grid item xs={12} md={3}>a</Grid>
                            </Grid> */}
                        </div>
                        <div className="cr-grid__grid-wrapper">
                            <TradingWrapper
                                layouts={rgl.layouts}
                                orderComponentResized={orderComponentResized}
                                orderBookComponentResized={orderBookComponentResized}
                                handleResize={this.handleResize}
                                handeDrag={this.handeDrag}
                            />
                        </div>
                        <div className="cr-grid__grid-wrapper">
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <div className="main-row-container">
                                        <div style={{ color: '#57B2F6', marginRight: 30, cursor: 'pointer' }}>Açık Emirlerim</div>
                                        <div style={{ marginRight: 30, cursor: 'pointer' }}>İşlem Geçmişi</div>
                                        <div style={{ marginRight: 30, cursor: 'pointer' }}>Alım/Satım Geçmişi</div>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="table-tr">Tarih</TableCell>
                                                    <TableCell align="center" className="table-tr">Market</TableCell>
                                                    <TableCell align="center" className="table-tr">Tip</TableCell>
                                                    <TableCell align="center" className="table-tr">İşlem</TableCell>
                                                    <TableCell align="center" className="table-tr">Stop Fiyat (BTC)</TableCell>
                                                    <TableCell align="center" className="table-tr">Fiyat (BTC)</TableCell>
                                                    <TableCell align="center" className="table-tr">Miktar (ETH)</TableCell>
                                                    <TableCell align="center" className="table-tr">Toplam (BTC)</TableCell>
                                                    <TableCell align="center" className="table-tr">Kalan (ETH)</TableCell>
                                                    <TableCell align="center" className="table-tr">Gerçekleşen Mik.</TableCell>
                                                    <TableCell align="right" className="table-tr">Toplam (BTC)</TableCell>
                                                    <TableCell align="right" className="table-tr"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row" className="table-tr">{row.history}</TableCell>
                                                        <TableCell align="center" style={index === 0 || index === 1 ? { color: '#57CA79' } : { color: '#FF5640' }} className="table-tr" >{row.market}</TableCell>
                                                        <TableCell align="center" style={index === 0 || index === 1 ? { color: '#57CA79' } : { color: '#FF5640' }} className="table-tr" >{row.medicine}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.operation}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.stopPrice}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.price}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.amount}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.total1}</TableCell>
                                                        <TableCell align="center" className="table-tr" >{row.remainder}</TableCell>
                                                        <TableCell align="center" className="table-tr">{row.actual}</TableCell>
                                                        <TableCell align="right" className="table-tr">{row.total2}</TableCell>
                                                        <TableCell align="right" className="table-tr">
                                                            <Button variant="contained" className="btn-cancel">
                                                                İptal et
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private setMarketFromUrlIfExists = (markets: Market[]): void => {
        const urlMarket: string = getUrlPart(2, window.location.pathname);
        const market: Market | undefined = markets.find(item => item.id === urlMarket);

        if (market) {
            this.props.setCurrentMarket(market);
        }
    };

    private setTradingTitle = (market: Market, tickers: ReduxProps['tickers']) => {
        const tickerPrice = tickers[market.id] ? tickers[market.id].last : '0.0';
        document.title = `${Decimal.format(tickerPrice, market.price_precision, ',')} ${market.name}`;
    };

    private handleResize = (layout, oldItem, newItem) => {
        switch (oldItem.i) {
            case '1':
                this.setState({
                    orderComponentResized: newItem.w,
                });
                break;
            case '3':
                this.setState({
                    orderBookComponentResized: newItem.w,
                });
                break;
            default:
                break;
        }
    };

    private handeDrag = (layout, oldItem, newItem) => {
        for (const elem of layout) {
            if (elem.y < 0) {
                elem.y = 0;
            }
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    user: selectUserInfo(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
    rgl: selectGridLayoutState(state),
    tickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: payload => dispatch(depthFetch(payload)),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    saveLayouts: payload => dispatch(saveLayouts(payload)),
});

export const TradingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Trading) as React.ComponentClass;
