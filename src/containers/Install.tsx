import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'react-dom-basic-kit'
import { updateOffsetTop } from '../components/DrawerModal'
import { useDefaultPageProps } from './PageRouterContext'
const cx = transformStyles(styles)

export const Install: React.FC<any> = (props) => {
  const installRef = React.useRef<any>()
  const setPageProps = useDefaultPageProps()
  const onClose = () => {
    setPageProps({ showInstall: false })
    // 重新 render 组件有延迟，这里提前设置 modal 到正确到位置
    updateOffsetTop(installRef.current)
  }
  return (
    <div className={cx('install')} ref={installRef}>
      <div onClick={onClose}>X</div>
      <div>open app</div>
    </div>
  )
}
export default Install
