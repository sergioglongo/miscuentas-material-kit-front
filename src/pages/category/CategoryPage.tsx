import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import CategoryView from 'src/sections/category/CategoryView';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Categorias - ${CONFIG.appName}`}</title>
      </Helmet>

      <CategoryView />
    </>
  );
}
