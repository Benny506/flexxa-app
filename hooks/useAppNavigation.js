import { usePathname, useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

const AppNavigationContext = createContext(null);

export const useAppNavigation = () => useContext(AppNavigationContext);

export const AppNavigationProvider = ({ children }) => {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const [currentRoute, setCurrentRoute] = useState(pathname);
  const [tabSegment, setTabSegment] = useState(segments[0] || null);
  const [canGoBack, setCanGoBack] = useState(false);

  // update route info whenever pathname changes
  useEffect(() => {
    setCurrentRoute(pathname);
    setTabSegment(segments[0] || null);
    setCanGoBack(window?.history?.length > 1); // Expo Router runs on web-like stack
  }, [pathname, segments]);

  // ✅ simplified navigation helpers
  const appNavigateTo = ({ path, params }) => {
    if (params) router.push({ pathname: path, params });
    else router.push(path);
  };

  const replace = ({ path, params }) => {
    if (params) router.replace({ pathname: path, params });
    else router.replace(path);
  };

  const goBack = () => router.back();

  const fullNavigateTo = ({ path, params }) => {
    // hard reset — can simulate CommonActions.reset()
    router.replace({ pathname: path, params });
  };

  const fullTabNavigateTo = ({ tab, screen, params }) => {
    const path = `/${tab}/${screen}`;
    if (params) router.push({ pathname: path, params });
    else router.push(path);
  };

  return (
    <AppNavigationContext.Provider
      value={{
        router,
        currentRoute,
        tabSegment,
        canGoBack,
        appNavigateTo,
        replace,
        goBack,
        fullNavigateTo,
        fullTabNavigateTo,
      }}
    >
      {children}
    </AppNavigationContext.Provider>
  );
};
