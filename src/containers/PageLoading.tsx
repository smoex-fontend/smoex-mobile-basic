import * as React from 'react'
import { usePageProps } from './PageRouter'
import { Loading } from '../components/Loading'

export const PageLoading = () => {
  return (
    <section>
      <Loading />
    </section>
  )
}
