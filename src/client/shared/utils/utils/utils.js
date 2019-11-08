export function cleanHttpsLink(httpLink) {
  if (httpLink && httpLink.replace) {
    return httpLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
  } else {
    return '';
  }
}
