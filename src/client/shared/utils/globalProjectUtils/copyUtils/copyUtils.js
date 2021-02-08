const LANGUAGES = {
  sv: 'sv',
  en: 'en',
};

function copyFormatter(copy, dynamicValue) {
  return copy.replace('${1}', dynamicValue);
}

export { LANGUAGES, copyFormatter };
