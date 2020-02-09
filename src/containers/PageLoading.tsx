import * as React from 'react'
import { usePageProps } from './PageRouterContext'
import { Loading } from '../components/Loading'

export const PageLoading = () => {
  return (
    <section>
      <Loading />
    </section>
  )
}
export default PageLoading
