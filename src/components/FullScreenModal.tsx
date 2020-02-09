import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  usePopupLayerOverlay,
} from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
import { PageLoading } from '../containers/PageLoading'
import { Loading } from './Loading'

const cx = transformStyles(styles)

const TFullScreenModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, onRemove } = props
  const shown = usePopupShown(isOpen)
  usePopupLayerOverlay(shown)

  return (
    <div
      className={cx('full-screen-modal', { shown })}
      onTransitionEnd={onRemove}
    >
      <div className={cx('full-screen-header')} onClick={() => onClose()}>
        X
      </div>
      <div className={cx('full-screen-content')}>
        <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
      </div>
    </div>
  )
}
export const FullScreenModal = enhancePopupComponent(TFullScreenModal)
export default FullScreenModal

const TMessageSModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose } = props
  return (
    <div className={cx('full-screen-modal')}>
      <div onClick={() => onClose()}>CLOSESS2222222</div>
      {props.children}
    </div>
  )
}
export const MessageModal = enhancePopupComponent(TMessageSModal)
