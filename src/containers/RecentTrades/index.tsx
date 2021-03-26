import classnames from 'classnames';
import * as React from 'react';
import {
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../';
import {
    Market,
    PublicTrade,
    resetHistory,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectMobileDeviceState,
    selectUserLoggedIn,
    setCurrentPrice,
    selectCurrentColorTheme
} from '../../modules';
import { recentTradesFetch, selectRecentTradesOfCurrentMarket } from '../../modules/public/recentTrades';
import Header from 'src/components/CoinHeader';
import CoinList from 'src/components/CoinList'

interface ReduxProps {
    recentTrades: PublicTrade[];
    currentMarket: Market | undefined;
    currentPrice: number | undefined;
    userLoggedIn: boolean;
    isMobileDevice: boolean;
    colorTheme: string;
}

interface DispatchProps {
    resetHistory: typeof resetHistory;
    tradesFetch: typeof recentTradesFetch;
    setCurrentPrice: typeof setCurrentPrice;
}

interface State {
    tab: string;
    index: number;
    disable: boolean;
}

import icon1 from 'src/assets/images/coin/btc.svg';
import graphic1 from 'src/assets/images/graphic/graphic-01.svg';
import icon2 from 'src/assets/images/coin/eth-1.svg';
import graphic2 from 'src/assets/images/graphic/graphic-02.svg';
import icon3 from 'src/assets/images/coin/ltc-1.svg';
import graphic3 from 'src/assets/images/graphic/graphic-03.svg';
import icon4 from 'src/assets/images/coin/hot-1.svg';
import graphic4 from 'src/assets/images/graphic/graphic-04.svg';
import icon5 from 'src/assets/images/coin/link-1.svg';
import graphic5 from 'src/assets/images/graphic/graphic-05.svg';
import icon6 from 'src/assets/images/coin/bat-1.svg';
import graphic6 from 'src/assets/images/graphic/graphic-06.svg';
import icon7 from 'src/assets/images/coin/mkr-1.svg';
import graphic7 from 'src/assets/images/graphic/graphic-07.svg';
import icon8 from 'src/assets/images/coin/bch-1.svg';
import graphic8 from 'src/assets/images/graphic/graphic-08.svg';
import icon9 from 'src/assets/images/coin/eos-1.svg';
import graphic9 from 'src/assets/images/graphic/graphic-09.svg';
import icon10 from 'src/assets/images/coin/xem-1.svg';
import graphic10 from 'src/assets/images/graphic/graphic-10.svg';
import icon11 from 'src/assets/images/coin/btg-1.svg';
import graphic11 from 'src/assets/images/graphic/graphic-11.svg';




export type RecentTradesProps = DispatchProps & ReduxProps & IntlProps;

class RecentTradesComponent extends React.Component<RecentTradesProps, State> {
    public state = { tab: 'market', index: 0, disable: false };

    public tabMapping = ['market', 'yours'];

    public componentWillUnmount() {
        this.props.resetHistory();
    }

    public render() {
        const className = classnames({
            'cr-table__noData': !this.props.recentTrades.length,
        });

        const cn = classnames('pg-recent-trades', {
            'pg-recent-trades-unlogged': !this.props.userLoggedIn,
        });

        const Itemdata = [
            { icon: icon1, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic1, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon2, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic2, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon3, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic3, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon4, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic4, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon5, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic5, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon6, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic6, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon7, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic7, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon8, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic8, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon9, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic9, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon10, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic10, value1: "413.437.00", value2: "+1.92%" },
            { icon: icon11, coinName1: 'BTC/TRY', coinName2: 'Bitcoin', graphic: graphic11, value1: "413.437.00", value2: "+1.92%" }
        ]
        const { colorTheme } = this.props;

        return (
            <div className={className}>
                <div className={cn}>
                    {this.renderHeader()}
                    {
                        Itemdata.map((val, index) => {
                            return (
                                <CoinList
                                    key={index}
                                    icon={val.icon}
                                    coinName1={val.coinName1}
                                    coinName2={val.coinName2}
                                    graphic={val.graphic}
                                    colorTheme={colorTheme}
                                    value1={val.value1}
                                    value2={val.value2}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    private renderHeader = () => {
        return (
            <Header />
        )
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    recentTrades: selectRecentTradesOfCurrentMarket(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
    userLoggedIn: selectUserLoggedIn(state),
    isMobileDevice: selectMobileDeviceState(state),
    colorTheme: selectCurrentColorTheme(state)
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    tradesFetch: market => dispatch(recentTradesFetch(market)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    resetHistory: () => dispatch(resetHistory()),
});

export const RecentTrades = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(RecentTradesComponent) as any; // tslint:disable-line
