# local-storage-vir

Simple wrapper for defining local storage key-value pairs.

# Install

```bash
npm i local-storage-vir
```

# Usage

<!-- example-link: src/readme-examples/no-default.example.ts -->

```TypeScript
import {createLocalStorageAccessor} from 'local-storage-vir';

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
```

Provide a default value to eliminate `undefined` from the `get()` output:

<!-- example-link: src/readme-examples/with-default.example.ts -->

```TypeScript
import {createLocalStorageAccessor} from 'local-storage-vir';

type MyStoredType = Record<string, number>;
const myStorageAccessor = createLocalStorageAccessor<MyStoredType>({
    key: 'my-key',
    default: {five: 5},
});

// the get value will always be defined due to the default provided above
const currentValue: MyStoredType = myStorageAccessor.get();
```
