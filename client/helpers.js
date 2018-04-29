module.exports = {
  removeDuplicates: function (array, prop) {
    // Accepts array of objects and removes duplicates
    let uniqueArray = [];
    let uniqueObject = {};
    let arrayLength = array.length;
    let i;
    // Generate objects identified by prop as key
    for (i = 0; i < arrayLength; i++) {
      uniqueObject[array[i][prop]] = array[i];
    }
    // Insert objects into array
    for (i in uniqueObject) {
      uniqueArray.push(uniqueObject[i]);
    }
    return uniqueArray;
  }
};
