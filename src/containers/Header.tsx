import * as React from 'react'
import '../index.scss' // TODO: 全局 scss 的引入暂时放在 Header
import styles from './styles/App.module.scss'
import { transformStyles } from 'react-dom-basic-kit'

import { useToggleModal, asModalProps } from 'react-dom-basic-kit'
import { NavLink } from 'react-router-dom'
import { MenuModal } from '../partials/MenuModal'
import { usePageProps } from './PageRouterContext'

const cx = transformStyles(styles)

export const Header: React.FC<any> = (props) => {
  const { showInstall } = usePageProps()
  const toggleModal = useToggleModal(MenuModal, [showInstall])

  return (
    <header id="Header" className={cx('header')}>
      <div className={cx('header-wrapper')}>
        <NavLink
          exact
          to={'/'}
          className={cx('header-logo')}
          activeClassName={cx('header-logo--disable')}
        >
          LOGO
        </NavLink>
        <div className={cx('header-menu')} onClick={toggleModal}>
          MENU
        </div>
      </div>
    </header>
  )
}
export default Header
