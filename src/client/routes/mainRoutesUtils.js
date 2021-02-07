import ALL_ROUTES from './routes';

export const getMainNavRoutes = () => {
  return [ALL_ROUTES.HOME];
};

export const getRouteValues = () => {
  return Object.values(ALL_ROUTES);
};
