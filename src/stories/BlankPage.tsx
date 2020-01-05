import * as React from 'react'
import { Route } from 'react-router-dom'
import { configureStore } from 'redux-async-kit'
import { Container } from 'react-dom-basic-kit'
import { PageRouter } from '../containers/PageRouter'
import { commonSlice, commonReducer } from 'smoex-common-business'
import { Provider } from 'react-redux'
// import { homeSlice } from 'common/slices/home'
import { createLazyComponent } from 'redux-async-kit'
import { PageLoading } from '../containers/PageLoading'

const store = configureStore({
  injector: commonSlice.injector,
  reducers: commonReducer,
})

// window['store'] = store

const HomePage = () => {
  return (
    <section>
      <PageLoading />
    </section>
  )
}

export const BlankPage: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <PageRouter>
          <Route path="/" component={HomePage} />
        </PageRouter>
      </Container>
    </Provider>
  )
}
