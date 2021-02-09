export function getStringBetweenChars(stringToSlice, lastChar, firstChar) {
  const indexOfDot = stringToSlice.lastIndexOf(lastChar) + 1;
  const indexOfSlash = stringToSlice.indexOf(firstChar);
  return stringToSlice.slice(
    indexOfDot,
    indexOfSlash !== -1 ? indexOfSlash : undefined
  );
}

export function getPageGlobals(globals, pageGlobals) {}
