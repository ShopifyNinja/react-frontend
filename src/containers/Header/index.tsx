import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { showLanding } from '../../api';
import { Logo } from '../../components';
import {
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMarketSelectorState,
    selectMobileWalletUi,
    selectSidebarState,
    setMobileWalletUi,
    toggleMarketSelector,
    toggleSidebar,
} from '../../modules';
import { HeaderToolbar } from '../HeaderToolbar';
import { NavBar } from '../NavBar';

import arrowBottom from './arrows/arrowBottom.svg';
import arrowBottomLight from './arrows/arrowBottomLight.svg';
import arrowRight from './arrows/arrowRight.svg';
import arrowRightLight from './arrows/arrowRightLight.svg';

import backIcon from './back.svg';
import backLightIcon from './backLight.svg';
import {
    Button,
    Menu,
    ButtonGroup,
    MenuItem
} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom'

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    mobileWallet: string;
    sidebarOpened: boolean;
    marketSelectorOpened: boolean;
}

interface DispatchProps {
    setMobileWalletUi: typeof setMobileWalletUi;
    toggleSidebar: typeof toggleSidebar;
    toggleMarketSelector: typeof toggleMarketSelector;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

const noHeaderRoutes = ['/confirm', '/404', '/500', '/setup'];

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class Head extends React.Component<Props> {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const history = useHistory()

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    constructor(props) {
        super(props);
        this.state = { anchorEl: null }
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose() {
        this.setState({ anchorEl: null })
    };

    public render() {
        const anchor = this.state;
        const { mobileWallet, location } = this.props;
        const tradingCls = location.pathname.includes('/trading') ? 'pg-container-trading' : '';
        const shouldRenderHeader =
            !noHeaderRoutes.some((r) => location.pathname.includes(r)) && location.pathname !== '/';

        if (!shouldRenderHeader) {
            return <React.Fragment />;
        }

        return (
            <header className={`pg-header`}>
                <div className={`pg-container pg-header__content ${tradingCls}`}>
                    {/* <div
                        className={`pg-sidebar__toggler ${mobileWallet && 'pg-sidebar__toggler-mobile'}`}
                        onClick={this.openSidebar}>
                        <span className="pg-sidebar__toggler-item" />
                        <span className="pg-sidebar__toggler-item" />
                        <span className="pg-sidebar__toggler-item" />
                    </div> */}
                    <div onClick={(e) => this.redirectToLanding()} className="pg-header__logo">
                        <Logo />
                    </div>
                    {/* {this.renderMarketToggler()}
                    <div className="pg-header__location">
                        {mobileWallet ? <span>{mobileWallet}</span> : <span>{location.pathname.split('/')[1]}</span>}
                    </div>
                    {this.renderMobileWalletNav()} */}
                    <div className="pg-header__navbar">
                        <div className="menu-item">ASCOINDEX</div>
                        <div
                            className="menu-item"
                        // onClick={() => { history.push('/trading') }}
                        >AL-SAT</div>
                        <div className="menu-item">DESTEK</div>
                        <div className="menu-item">ORTAKLIK</div>
                        <div className="menu-item">BLOG</div>
                        <ButtonGroup size="small" aria-label="small outlined button group" className="menu-item">
                            <Button>Pro</Button>
                            <Button>Kolay</Button>
                            <Button>Hızlı</Button>
                        </ButtonGroup>
                        <div className="menu-item">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{ display: 'flex' }}>
                                TR
                                <ExpandMoreIcon />
                            </div>
                            <Menu
                                id="simple-menu"
                                // anchorEl={this.state.anchorEl}
                                keepMounted
                                // open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>TR</MenuItem>
                                <MenuItem onClick={this.handleClose}>EN</MenuItem>
                            </Menu>
                        </div>
                        <NavBar onLinkChange={this.closeMenu} />
                        <div className="menu-item">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{ display: 'flex' }}>
                                50.000 ₺
                                <ExpandMoreIcon />
                            </div>
                            <Menu
                                id="simple-menu"
                                // anchorEl={this.state.anchorEl}
                                keepMounted
                                // open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>???</MenuItem>
                                <MenuItem onClick={this.handleClose}>???</MenuItem>
                                <MenuItem onClick={this.handleClose}>???</MenuItem>
                            </Menu>
                        </div>
                        <Button variant="contained" className="menu-item btn-login1">
                            <AccountBalanceWalletIcon />
                            Cüzdan
                        </Button>
                        <Button variant="contained" className="menu-item btn-register1">
                            <PersonIcon style={{ color: '#57b2f6' }} />
                            Hesabım
                        </Button>
                    </div>
                </div>
            </header>
        );
    }

    public renderMobileWalletNav = () => {
        const { colorTheme, mobileWallet } = this.props;
        return (
            mobileWallet && (
                <div onClick={this.backWallets} className="pg-header__toggler">
                    <img alt="" src={colorTheme === 'light' ? backLightIcon : backIcon} />
                </div>
            )
        );
    };

    public translate = (id: string) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };

    private renderMarketToolbar = () => {
        if (!this.props.location.pathname.includes('/trading/')) {
            return null;
        }

        return <HeaderToolbar />;
    };

    private renderMarketToggler = () => {
        const { currentMarket, marketSelectorOpened, colorTheme } = this.props;
        const isLight = colorTheme === 'light';
        if (!this.props.location.pathname.includes('/trading/')) {
            return null;
        }

        return (
            <div className="pg-header__market-selector-toggle" onClick={this.props.toggleMarketSelector}>
                <p className="pg-header__market-selector-toggle-value">{currentMarket && currentMarket.name}</p>
                {marketSelectorOpened ? (
                    <img src={isLight ? arrowBottomLight : arrowBottom} alt="arrow" />
                ) : (
                    <img src={isLight ? arrowRightLight : arrowRight} alt="arrow" />
                )}
            </div>
        );
    };

    private redirectToLanding = () => {
        this.props.toggleSidebar(false);
        this.props.history.push(`${showLanding() ? '/' : '/trading'}`);
    };

    private openSidebar = () => this.props.toggleSidebar(!this.props.sidebarOpened);

    private backWallets = () => this.props.setMobileWalletUi('');

    private closeMenu = (e: any) => this.props.setMobileWalletUi('');
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
    mobileWallet: selectMobileWalletUi(state),
    sidebarOpened: selectSidebarState(state),
    marketSelectorOpened: selectMarketSelectorState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
    toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const Header = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Head) as React.ComponentClass;
