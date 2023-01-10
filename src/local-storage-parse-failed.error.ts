import {extractErrorMessage} from '@augment-vir/common';

export class LocalStorageParseFailedError extends Error {
    public override name = 'LocalStorageGetFailedError';

    constructor(key: string, storedValue: string, originalError: unknown) {
        super(
            `Failed to parse Local Storage data from key '${key}'. Got invalid JSON data '${storedValue}': ${extractErrorMessage(
                originalError,
            )}`,
        );
    }
}
