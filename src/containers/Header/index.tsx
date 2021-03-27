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
import { NavBar } from '../NavBar';
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

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    mobileWallet: string;
    sidebarOpened: boolean;
    marketSelectorOpened: boolean;
}

interface SetupFormState {
    anchorEl: null;
    anchorEl1: null;
    scrolling: boolean;
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

class Head extends React.Component<Props, SetupFormState> {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            anchorEl1: null,
            scrolling: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 0)
            this.setState({ scrolling: true })
        else
            this.setState({ scrolling: false })
    }

    public render() {
        const { anchorEl, anchorEl1, scrolling } = this.state;
        const { location } = this.props;
        const tradingCls = location.pathname.includes('/trading') ? 'pg-container-trading' : '';
        const shouldRenderHeader =
            !noHeaderRoutes.some((r) => location.pathname.includes(r)) && location.pathname !== '/';

        if (!shouldRenderHeader) {
            return <React.Fragment />;
        }

        return (
            <header className={scrolling ? `fixed` : `pg-header`}>
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
                    <div className="pg-header__navbar">
                        <div className="menu-item">ASCOINDEX</div>
                        <div
                            className="menu-item"
                        >AL-SAT</div>
                        <div className="menu-item">DESTEK</div>
                        <div className="menu-item">ORTAKLIK</div>
                        <div className="menu-item">BLOG</div>
                        <ButtonGroup size="small" aria-label="small outlined button group" className="menu-item">
                            <Button className="btn-group-item">Pro</Button>
                            <Button className="btn-group-item">Kolay</Button>
                            <Button className="btn-group-item">Hızlı</Button>
                        </ButtonGroup>
                        <div className="menu-item">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => this.handleClick(e)} style={{ display: 'flex' }}>
                                TR
                                <ExpandMoreIcon />
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>TR</MenuItem>
                                <MenuItem onClick={this.handleClose}>EN</MenuItem>
                            </Menu>
                        </div>
                        <NavBar onLinkChange={this.closeMenu} />
                        <div className="menu-item">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick1} style={{ display: 'flex', color: '#57B2F6' }}>
                                50.000 ₺
                                <ExpandMoreIcon />
                            </div>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl1}
                                keepMounted
                                open={Boolean(anchorEl1)}
                                onClose={this.handleClose1}
                            >
                                <MenuItem onClick={this.handleClose1}>???</MenuItem>
                                <MenuItem onClick={this.handleClose1}>???</MenuItem>
                                <MenuItem onClick={this.handleClose1}>???</MenuItem>
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

    private handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    private handleClose = () => {
        this.setState({ anchorEl: null })
    };

    private handleClick1 = (event) => {
        this.setState({ anchorEl1: event.currentTarget })
    };

    private handleClose1 = () => {
        this.setState({ anchorEl1: null })
    };

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

    private redirectToLanding = () => {
        this.props.toggleSidebar(false);
        this.props.history.push(`${showLanding() ? '/' : '/trading'}`);
    };

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
