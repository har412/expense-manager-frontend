import { Helmet } from 'react-helmet-async';

import { ExpenseView } from 'src/sections/expense/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Expense Manager </title>
      </Helmet>

      <ExpenseView />
    </>
  );
}
