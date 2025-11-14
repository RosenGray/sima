

export const getNumberOfDorsOptions = () => {
    const numberOfDors = 10;
    const numberOfDorsOptions = Array.from({ length: numberOfDors }, (_, index) => ({
        value: index + 1,
        label: index + 1,
    }));
    return numberOfDorsOptions;
}