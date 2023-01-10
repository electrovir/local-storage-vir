import {randomString} from '@augment-vir/browser';
import {assertTypeOf} from '@augment-vir/browser-testing';
import {assert} from '@open-wc/testing';
import {createLocalStorageAccessor} from './create-local-storage-wrapper';
import {LocalStorageParseFailedError} from './local-storage-parse-failed.error';

describe(createLocalStorageAccessor.name, () => {
    it('should always get undefined values if no generic is given', () => {
        const exampleInstance = createLocalStorageAccessor({
            key: randomString(),
        });

        assertTypeOf(exampleInstance.get()).toEqualTypeOf<undefined>();
    });
    it('should possibly get undefined values when no default value is provided', () => {
        const exampleInstanceWithGeneric = createLocalStorageAccessor<string>({
            key: randomString(),
        });

        assertTypeOf(exampleInstanceWithGeneric.get()).toEqualTypeOf<string | undefined>();
    });
    it('should possibly get undefined values when an undefined default value is provided', () => {
        const exampleInstanceWithUndefinedDefault = createLocalStorageAccessor<string>({
            key: randomString(),
            default: undefined,
        });

        assertTypeOf(exampleInstanceWithUndefinedDefault.get()).toEqualTypeOf<string | undefined>();
    });
    it('should possibly get undefined values if undefined is explicitly provided in the generic', () => {
        const exampleInstanceWithUndefinedInGeneric = createLocalStorageAccessor<
            string | undefined
        >({
            key: randomString(),
            default: 'yo',
        });

        assertTypeOf(exampleInstanceWithUndefinedInGeneric.get()).toEqualTypeOf<
            string | undefined
        >();
    });
    it('should get definitely defined values when a default value is provided', () => {
        const exampleInstanceWithDefinedDefault = createLocalStorageAccessor({
            key: randomString(),
            default: 'hello there',
        });

        assertTypeOf(exampleInstanceWithDefinedDefault.get()).not.toEqualTypeOf<
            string | undefined
        >();
        assertTypeOf(exampleInstanceWithDefinedDefault.get()).toEqualTypeOf<string>();
    });
    it('should operate with a default value', () => {
        const defaultValue = 'hello there';
        const workingInstance = createLocalStorageAccessor({
            key: randomString(),
            default: defaultValue,
        });

        const valueBeforeSetting = workingInstance.get();
        const valueToSet = randomString();
        workingInstance.set(valueToSet);
        const valueAfterSetting = workingInstance.get();
        workingInstance.remove();
        const valueAfterRemoving = workingInstance.get();

        assert.strictEqual(valueBeforeSetting, defaultValue);
        assert.strictEqual(valueAfterSetting, valueToSet);
        assert.strictEqual(valueAfterRemoving, defaultValue);
    });
    it('should operate without a default value', () => {
        const workingInstance = createLocalStorageAccessor<string>({
            key: randomString(),
        });

        const valueBeforeSetting = workingInstance.get();
        const valueToSet = randomString();
        workingInstance.set(valueToSet);
        const valueAfterSetting = workingInstance.get();
        workingInstance.remove();
        const valueAfterRemoving = workingInstance.get();

        assert.isUndefined(valueBeforeSetting);
        assert.strictEqual(valueAfterSetting, valueToSet);
        assert.isUndefined(valueAfterRemoving);
    });
    it('should fail when trying to read invalid json', () => {
        const workingInstance = createLocalStorageAccessor<string>({
            key: randomString(),
        });

        globalThis.localStorage.setItem(workingInstance.key, 'invalidJsonThing');

        assert.throws(workingInstance.get, LocalStorageParseFailedError);
    });
    it('should return undefined if an empty string is stored', () => {
        const workingInstance = createLocalStorageAccessor<string>({
            key: randomString(),
        });

        globalThis.localStorage.setItem(workingInstance.key, '');

        assert.isUndefined(workingInstance.get());
    });
    it('should work with object types', () => {
        type StoredType = Record<string, number>;
        const myStorageAccessor = createLocalStorageAccessor<StoredType>({key: 'my-key'});

        const valueToSave = {keyA: 4};

        myStorageAccessor.set(valueToSave);

        assertTypeOf<ReturnType<typeof myStorageAccessor.get>>().toEqualTypeOf<
            StoredType | undefined
        >();
        assert.deepStrictEqual(myStorageAccessor.get(), valueToSave);
    });
    it('should work with defaults and object types', () => {
        type StoredType = Record<string, number>;
        const myStorageAccessor = createLocalStorageAccessor<StoredType>({
            key: 'my-key',
            default: {five: 5},
        });

        const valueToSave = {keyA: 4};

        myStorageAccessor.set(valueToSave);

        assertTypeOf<ReturnType<typeof myStorageAccessor.get>>().toEqualTypeOf<StoredType>();
        assert.deepStrictEqual(myStorageAccessor.get(), valueToSave);
    });
});
