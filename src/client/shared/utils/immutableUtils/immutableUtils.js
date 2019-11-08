export function imPush(arr, newEntry) {
  return [...arr, newEntry];
}

export function imArrayMerge(first, second) {
  return [...first, ...second];
}

// It basically add an item to a list If item exists it updates it with new value,
// otherwise it just adds the item to the list, ie. The list shall not have any duplicated items.
export function imSetToArray(array = [], mapToAdd = {}, objUniqueField = '') {
  const indexToUpdate = array.findIndex((arrayItem) => {
    return arrayItem[objUniqueField] === mapToAdd[objUniqueField];
  });

  if (indexToUpdate === -1) {
    // mapToAdd doesn't exists in list
    return imPush(array, mapToAdd);
  } else {
    // mapToAdd obj exists in list. Update old obj with mapToAdd
    const firstPart = imPush(array.slice(0, indexToUpdate), mapToAdd);
    const secondPart = array.slice(indexToUpdate + 1);
    return imArrayMerge(firstPart, secondPart);
  }
}

export function imSetToObj(obj = {}, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}
