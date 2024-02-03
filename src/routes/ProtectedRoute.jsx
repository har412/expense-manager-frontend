import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { verifyUser } from 'src/utils/authVerify';

import { useRouter } from './hooks';

function ProtectedRoute({ children }) {
  const router = useRouter();
  const isAuthenticated = verifyUser();

  console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
