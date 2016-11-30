/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import Content from './Content';

export default {

  path: '*',

  async action({ path }) { // eslint-disable-line react/prop-types
    const resp = await fetch(`https://api.github.com/repos${path}`);
    if (resp.status === 404) return undefined;
    if (resp.status !== 200) throw new Error(resp.statusText);
    const data = await resp.json();
    if (!data || !data.name) return undefined;
    return {
      title: data.name,
      component: <Layout><Content title={data.name} content={data.description} /></Layout>,
    };
  },

};
