function sortObjectsArray (isDescending, list, selector) {
    return list.sort((a, b) => {
        if (isDescending) {
            return parseFloat(b[selector]) - parseFloat(a[selector]);
        } else {
            return parseFloat(a[selector]) - parseFloat(b[selector]);
        }
    });
};

export {
    sortObjectsArray
}