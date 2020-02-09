import * as React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { useAsyncCallback } from 'redux-async-kit'
import { accountAsyncAction, commonSlice } from 'smoex-common-business'
import { Footer } from './Footer'
import { PageError } from './PageError'
import { PageLoading } from './PageLoading'
import { Install } from './Install'
import { BROWSER_INFO } from 'react-dom-basic-kit'
import { IS_QQ_WEBVIEW } from '../utils/device'
import { Controller } from './Controller'
import { IS_WECHAT_WEBVIEW } from '../utils/device'
import { useToastError } from 'react-dom-basic-kit'

export const PageContext = React.createContext<any>(null)

export const DEFALUT_PAGE_PROPS: any = {
  showHeader: true,
  showFooter: true,
  showInstall: true,
}

export function usePageProps(props: any = {}, deps: any[] = []) {
  const { setPageProps, pageProps } = React.useContext(PageContext)
  React.useEffect(() => {
    setPageProps(props)
    return () => {
      setPageProps(DEFALUT_PAGE_PROPS)
    }
  }, deps)
  return pageProps
}

export function useDefaultPageProps() {
  const { setPageProps } = React.useContext(PageContext)
  return (pageProps: any) => {
    setPageProps(pageProps)
    Object.keys(pageProps).forEach((key) => {
      DEFALUT_PAGE_PROPS[key] = pageProps[key]
    })
  }
}
