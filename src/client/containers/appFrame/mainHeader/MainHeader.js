import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { toggleFixedBody } from '@lvlsgroup/react-component-lib/src/client/shared/utils/dom/dom';
import MainNavMobile from '@client/containers/appFrame/mainHeader/mainNavMobile/MainNavMobile';
import MainNavDesktop from '@client/containers/appFrame/mainHeader/mainNavDesktop/MainNavDesktop';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import burgerIcon from './burgermenu-icon.svg';
import styles from './mainHeader.scss';

const MOBILE_MENU_STATES = {
  NOT_RENDERED: 0,
  HIDDEN: 1,
  VISIBLE: 2,
};

class MainHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenu: MOBILE_MENU_STATES.NOT_RENDERED,
      whiteHeaderBackground: false,
    };
  }

  getStickyHeaderClassNames() {
    return classNames({
      [styles.stickyHeader]: true,
      [styles.stickyHeaderTransitionDark]: this.state.whiteHeaderBackground,
    });
  }

  toggleMobileMenu = () => {
    toggleFixedBody();
    this.setState((prevState) => {
      const newMenuState =
        prevState.mobileMenu === MOBILE_MENU_STATES.VISIBLE
          ? MOBILE_MENU_STATES.HIDDEN
          : MOBILE_MENU_STATES.VISIBLE;

      return {
        mobileMenu: newMenuState,
      };
    });
  };

  render() {
    return (
      <header className={styles.mainHeader}>
        <div
          className={classNames(
            this.getStickyHeaderClassNames(),
            styleHelper.pageWidthAndCentralizer
          )}
        >
          <MainNavDesktop
            className={classNames(
              styles.topMenuDesktopProp,
              styleHelper.pageWidthAndCentralizer
            )}
            currentPathName={this.props.location.pathname}
          />
          {this.state.mobileMenu === MOBILE_MENU_STATES.VISIBLE ? (
            <div onClick={this.toggleMobileMenu} className={styles.closeIcon}>
              ✕
            </div>
          ) : (
            <img
              onClick={this.toggleMobileMenu}
              className={styles.burgerIcon}
              height="50"
              width="20"
              src={burgerIcon}
            />
          )}
        </div>
        {this.state.mobileMenu > MOBILE_MENU_STATES.NOT_RENDERED && (
          <MainNavMobile
            isVisible={this.state.mobileMenu === MOBILE_MENU_STATES.VISIBLE}
            toggleMobileMenu={this.toggleMobileMenu}
            currentPathName={this.props.location.pathname}
          />
        )}
        {this.state.mobileMenu === MOBILE_MENU_STATES.VISIBLE && (
          <div onClick={this.toggleMobileMenu} className={styles.overlay} />
        )}
      </header>
    );
  }
}

MainHeader.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(MainHeader);
