import React from 'react'
import { withApollo } from '../frontend/apollo';
import { Header } from './../frontend/components/Header';

const IndexPage = () => (
  <Header />
)

export default withApollo(IndexPage);