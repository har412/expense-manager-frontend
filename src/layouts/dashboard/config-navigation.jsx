import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Expense',
    path: '/expense',
    icon: icon('ic_cart'),
  },
  {
    title: 'Expense Category',
    path: '/expense-category',
    icon: icon('ic_cart'),
  },
  {
    title: 'income',
    path: '/income',
    icon: icon('ic_lock'),
  },
  {
    title: 'Income Category',
    path: '/income-category',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
