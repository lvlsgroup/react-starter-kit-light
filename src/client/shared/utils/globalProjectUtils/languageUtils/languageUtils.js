import { getStringBetweenChars } from '@client/shared/utils/generalUtils/jsUtils/jsUtils';

export const TOP_DOMAIN_LANG_MAP = {
  se: 'sv',
  com: 'en',
};

export function getLanguageCode(hostname) {
  const topLevelDomain = getStringBetweenChars(hostname, '.', '/');

  if (topLevelDomain) {
    return TOP_DOMAIN_LANG_MAP[topLevelDomain];
  } else {
    // Default language
    return 'sv';
  }
}
