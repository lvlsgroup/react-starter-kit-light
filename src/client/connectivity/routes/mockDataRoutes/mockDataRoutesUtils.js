import { LANGUAGES } from '@client/shared/utils/globalProjectUtils/copyUtils/copyUtils';
import sv_allCopy from '@client/connectivity/routes/mockDataRoutes/sv_RoutesMockData/sv_allCopy';
import en_allCopy from '@client/connectivity/routes/mockDataRoutes/en_RoutesMockData/en_allCopy';

export function getMockDataRoutes(slug, languageCode) {
  if (languageCode === LANGUAGES.sv) {
    return sv_allCopy[slug];
  } else {
    // eslint-disable-next-line no-undef
    return en_allCopy[slug];
  }
}
