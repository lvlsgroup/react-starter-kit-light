const LANGUAGES = {
  SV: 'SV',
  EN: 'EN',
};

function copyFormatter(copy, dynamicValue) {
  return copy.replace('${1}', dynamicValue);
}

export { LANGUAGES, copyFormatter };
