import * as React from 'react'

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
