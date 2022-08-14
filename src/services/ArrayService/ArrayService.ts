class ArrayService {
    // This method returns a new array, that only contains unique values, from any given array
    getUniqueValuesArray(array: any[]) {
        // @ts-ignore
        return [...new Set(array)];
    }
}

const arrayService = new ArrayService();

export default arrayService;
