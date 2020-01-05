import React from 'react'
import { storiesOf } from '@storybook/react'
import '../styles.scss'
import { BlankPage } from './BlankPage'
// import { BlankPageBuild } from './BlankPageBuild'

storiesOf('BlankPage', module).add('blank page', () => <BlankPage />)
// .add('blank page build', () => <BlankPageBuild /> )
