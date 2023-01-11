import {LocalStorageParseFailedError} from './local-storage-parse-failed.error';
import {BroadenNonNullableType, LocalStorageWrapper, ValueBase} from './local-storage-wrapper';

export type LocalStorageSetSanitizer<ValueGeneric extends ValueBase | undefined> = (
    value: Parameters<LocalStorageWrapper<ValueGeneric>['set']>[0],
) => typeof value | undefined;

type CreateLocalStorageAccessorStandardInputs<ValueGeneric extends ValueBase | undefined> = {
    key: string;
    /** Sanitize inputs to the set method. If this callback returns undefined, no value will be set. */
    setSanitizer?: LocalStorageSetSanitizer<ValueGeneric>;
};

export function createLocalStorageAccessor<ValueGeneric extends ValueBase | undefined>(
    inputs: CreateLocalStorageAccessorStandardInputs<ValueGeneric> & {
        /**
         * Default value to use for the output of the get method if no value has been stored in
         * LocalStorage yet.
         */ default: BroadenNonNullableType<ValueGeneric>;
    },
): LocalStorageWrapper<ValueGeneric>;
export function createLocalStorageAccessor<ValueGeneric extends ValueBase | undefined = undefined>(
    inputs: CreateLocalStorageAccessorStandardInputs<ValueGeneric> & {
        /**
         * Default value to use for the output of the get method if no value has been stored in
         * LocalStorage yet.
         */ default?: undefined;
    },
): LocalStorageWrapper<ValueGeneric | undefined>;
export function createLocalStorageAccessor<ValueGeneric extends ValueBase | undefined = undefined>(
    inputs: CreateLocalStorageAccessorStandardInputs<ValueGeneric> & {
        /**
         * Default value to use for the output of the get method if no value has been stored in
         * LocalStorage yet.
         */
        default?: BroadenNonNullableType<ValueGeneric> | undefined;
    },
): LocalStorageWrapper<ValueGeneric> | LocalStorageWrapper<ValueGeneric | undefined> {
    function set(newValue: BroadenNonNullableType<ValueGeneric>) {
        let valueToSet: BroadenNonNullableType<ValueGeneric> | undefined = newValue;
        if (inputs.setSanitizer) {
            valueToSet = inputs.setSanitizer(newValue);
        }
        if (valueToSet !== undefined) {
            globalThis.localStorage.setItem(inputs.key, JSON.stringify(valueToSet));
        }
    }

    function get() {
        const storedValue = globalThis.localStorage.getItem(inputs.key);
        if (storedValue == null) {
            if (inputs.default == undefined) {
                return undefined;
            } else {
                set(inputs.default);
                return inputs.default;
            }
        } else if (storedValue === '') {
            return undefined;
        } else {
            try {
                return JSON.parse(storedValue);
            } catch (error) {
                throw new LocalStorageParseFailedError(inputs.key, storedValue, error);
            }
        }
    }

    function remove() {
        globalThis.localStorage.removeItem(inputs.key);
    }

    return {
        key: inputs.key,
        get,
        set,
        remove,
    };
}
