import {JsonValue} from 'type-fest';
import {LocalStorageParseFailedError} from './local-storage-parse-failed.error';
import {BroadenNonNullableType, LocalStorageWrapper} from './local-storage-wrapper';

export function createLocalStorageAccessor<
    ValueType extends Exclude<JsonValue, null> | undefined,
>(inputs: {
    key: string;
    default: BroadenNonNullableType<ValueType>;
}): LocalStorageWrapper<ValueType>;

export function createLocalStorageAccessor<
    ValueType extends Exclude<JsonValue, null> | undefined = undefined,
>(inputs: {key: string; default?: undefined}): LocalStorageWrapper<ValueType | undefined>;

export function createLocalStorageAccessor<
    ValueType extends Exclude<JsonValue, null> | undefined = undefined,
>(inputs: {
    key: string;
    default?: BroadenNonNullableType<ValueType> | undefined;
}): LocalStorageWrapper<ValueType> | LocalStorageWrapper<ValueType | undefined> {
    function set(newValue: BroadenNonNullableType<ValueType>) {
        globalThis.localStorage.setItem(inputs.key, JSON.stringify(newValue));
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
