import { Helmet } from 'react-helmet-async';

import { IncomeCategoryView } from 'src/sections/incomeCategory/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> IncomeCategory Manager </title>
      </Helmet>

      <IncomeCategoryView />
    </>
  );
}
