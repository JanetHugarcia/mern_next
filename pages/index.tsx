 
import React from 'react';
import Link from 'next/link';
import { withApollo } from '../frontend/apollo';

const IndexPage = () => (
  <ul>
    <li>
      <Link href="/a" as="/a">
        <a>a</a>
      </Link>
    </li>
    <li>
      <Link href="/b" as="/b">
        <a>b</a>
      </Link>
    </li>
  </ul>
)

export default withApollo(IndexPage);