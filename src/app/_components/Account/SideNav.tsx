import { getProfile } from '../../_libs/apiServices';
import { cookies } from 'next/headers';
import ClientWrapper from './ClientWrapper';
import ApiErrorDisplay from '../UI/ApiErrorDisplay';

async function SideNavigation() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return (
      <ApiErrorDisplay
        error={{
          status: 'error',
          message: 'Authentication required. Please log in to continue.',
          statusCode: 401,
        }}
        title="Authentication Required"
        size="small"
        className="py-10 pl-2"
      />
    );
  }

  try {
    const response = await getProfile(token);
    
    if (response.status === 'error') {
      return (
        <ApiErrorDisplay
          error={response}
          title="Profile Loading Error"
          size="small"
          className="py-10 pl-2"
        />
      );
    }

    const { user } = response.data;

    if (!user) {
      return (
        <ApiErrorDisplay
          error={{
            status: 'error',
            message: 'User profile data is not available.',
            statusCode: 404,
          }}
          title="User Not Found"
          size="small"
          className="py-10 pl-2"
        />
      );
    }

    return <ClientWrapper user={user} />;
  } catch (error) {
    console.error('SideNavigation error:', error);
    return (
      <ApiErrorDisplay
        error={{
          status: 'error',
          message: error instanceof Error ? error.message : 'An unexpected error occurred while loading your profile.',
          statusCode: 500,
        }}
        title="Profile Error"
        size="small"
        className="py-10 pl-2"
      />
    );
  }
}

export default SideNavigation;
