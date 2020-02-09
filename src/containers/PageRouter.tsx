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
import { DEFALUT_PAGE_PROPS, PageContext } from './PageRouterContext'

function useInitLoading() {
  const [getInfo, infoState] = commonSlice.useAction(accountAsyncAction.getInfo)
  const [loading, setLoading] = React.useState(true)
  const onGetInfo = useAsyncCallback(async () => {
    await getInfo()
    setLoading(false)
  }) as any
  React.useEffect(() => {
    if (infoState.error) {
      setLoading(false)
    }
  }, [infoState.error])

  useToastError(infoState.error)

  React.useEffect(() => {
    onGetInfo()
  }, [])
  return loading
}

function initInnerHeight(rootNode: any) {
  const innerHeight = window.innerHeight ? window.innerHeight + 'px' : '100vh'
  rootNode.style.minHeight = innerHeight
}

function initRootHeight() {
  const rootNode = document.getElementById('root') as any
  if (!rootNode.style.minHeight) {
    // 初始化 min height， 主要目的为兼容 safari 的 innerHeight
    initInnerHeight(rootNode)
  } else if (IS_WECHAT_WEBVIEW) {
    // 兼容 wechat 内置浏览器路由切换时 innerHeight 不一致的问题, 路由延迟大概 100 ms
    setTimeout(() => {
      initInnerHeight(rootNode)
    }, 100)
  }
}

export const PageRouter: React.FC<any> = (props) => {
  const { children } = props
  const [pageProps, setPageProps] = React.useState(DEFALUT_PAGE_PROPS)
  const loading = useInitLoading()
  const { pathname } = useLocation()
  const [pageContext, setPageContext] = React.useState<any>({
    setPageProps: (pageProps: any) =>
      setPageProps((mProps: any) => ({ ...mProps, ...pageProps })),
    pageProps: DEFALUT_PAGE_PROPS,
  })
  React.useEffect(() => {
    setPageContext((mProps: any) => ({ ...mProps, pageProps }))
  }, [pageProps])
  React.useEffect(() => {
    initRootHeight()
  }, [pathname])
  const { showHeader, showFooter, showInstall } = pageProps
  return (
    <PageContext.Provider value={pageContext}>
      {showInstall && <Install />}
      {showHeader && <Header />}
      {loading ? (
        <PageLoading />
      ) : (
        <React.Suspense fallback={<PageLoading />}>
          <Switch>
            {false ? <PageError code={500} /> : children}
            <Route render={() => <PageError code={404} />} />
          </Switch>
          {showFooter && <Footer />}
        </React.Suspense>
      )}
      {!loading && <Controller />}
    </PageContext.Provider>
  )
}
export default PageRouter
