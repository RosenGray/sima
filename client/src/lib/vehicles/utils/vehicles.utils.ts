

export const getNumberOfDorsOptions = () => {
    const numberOfDors = 10;
    const numberOfDorsOptions = Array.from({ length: numberOfDors }, (_, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString(),
    }));
    return numberOfDorsOptions;
}