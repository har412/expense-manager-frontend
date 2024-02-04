import { Helmet } from 'react-helmet-async';

import { ExpenseCategoryView } from 'src/sections/expenseCategory/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> ExpenseCategory Manager </title>
      </Helmet>

      <ExpenseCategoryView />
    </>
  );
}
