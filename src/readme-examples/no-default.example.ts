import {createLocalStorageAccessor} from '..';

type MyStoredType = Record<string, number>;
const myStorageAccessor = createLocalStorageAccessor<MyStoredType>({
    key: 'my-key',
});

// set the value
myStorageAccessor.set({keyA: 4});

// get the value
const currentValue: MyStoredType | undefined = myStorageAccessor.get();

// remove the value
myStorageAccessor.remove();
