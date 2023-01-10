import {createLocalStorageAccessor} from '..';

type MyStoredType = Record<string, number>;
const myStorageAccessor = createLocalStorageAccessor<MyStoredType>({
    key: 'my-key',
    default: {five: 5},
});

// the get value will always be defined due to the default provided above
const currentValue: MyStoredType = myStorageAccessor.get();
