import { Helmet } from 'react-helmet-async';

import { IncomeView } from 'src/sections/income/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Income Manager </title>
      </Helmet>

      <IncomeView />
    </>
  );
}
