// libs/auth/src/hooks/useAuthentication.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

export function useAuthentication(audience: string) {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    loginWithRedirect, 
    logout,
    getAccessTokenSilently
  } = useAuth0();

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    console.log('lovable Permissions:', permissions);
  }, [permissions]);

  const getTokenSilently = async () => {
    try {
      const token =  await getAccessTokenSilently({
        authorizationParams: {
          audience,
          scope: 'openid profile email offline_access'
        }
      })
      const tokenPermissions = JSON.parse(atob(token.split('.')[1])).permissions || [];
      setPermissions(tokenPermissions);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  const hasPermission = (permission: string) => {
    if (!permission || !Array.isArray(permissions)) {
      return false;
    }

    const trimmedPermission = permission.trim();
    const singularPermission = trimmedPermission.endsWith('s') ? trimmedPermission.slice(0, -1) : trimmedPermission;
    const pluralPermission = trimmedPermission.endsWith('s') ? trimmedPermission : `${trimmedPermission}s`;

    return permissions.some(p => {
      const normalizedPermission = p.trim();
      return normalizedPermission === singularPermission ||
        normalizedPermission === pluralPermission;
    });
  };

  const customLoginWithRedirect = () => {
    return loginWithRedirect({
      authorizationParams: { scope: 'openid profile email offline_access' },
    })
  }

  return {
    getTokenSilently,
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect: customLoginWithRedirect,
    hasPermission,
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
  };
}

export default useAuthentication;