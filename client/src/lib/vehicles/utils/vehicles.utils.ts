

export const getNumberOfDorsOptions = () => {
    const numberOfDors = 10;
    const numberOfDorsOptions = Array.from({ length: numberOfDors }, (_, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString(),
    }));
    return numberOfDorsOptions;
}


export const getYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const years = currentYear - startYear + 1;
    const yearsOptions = Array.from({ length: years }, (_, index) => {
        const year = startYear + index;
        return {
            value: year.toString(),
            label: year.toString(),
        };
    });
    return yearsOptions;
}


export const getNumberOfHandsOptions = () => {
    const numberOfHands = 20;
    const numberOfHandsOptions = Array.from({ length: numberOfHands }, (_, index) => ({
        value: (index + 1).toString(),
        label: (index + 1).toString(),
    }));
    return numberOfHandsOptions;
}