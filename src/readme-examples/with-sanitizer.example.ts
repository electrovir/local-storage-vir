import {createLocalStorageAccessor} from '..';

const myStoredNumber = createLocalStorageAccessor<number>({
    key: 'my-key',
    setSanitizer: (input) => {
        // prevent negative values
        return Math.abs(input);
    },
});

myStoredNumber.set(-4); // this will set the value 4
