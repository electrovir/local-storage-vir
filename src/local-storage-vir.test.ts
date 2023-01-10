import {assertTypeOf} from '@augment-vir/browser-testing';
import {LocalStorageWrapper} from './local-storage-wrapper';

describe('LocalStorageWrapper', () => {
    it('should handle a definitely defined generic', () => {
        assertTypeOf<ReturnType<LocalStorageWrapper<string>['get']>>().toEqualTypeOf<string>();
        assertTypeOf<ReturnType<LocalStorageWrapper<string | undefined>['get']>>().toEqualTypeOf<
            string | undefined
        >();
        assertTypeOf<Parameters<LocalStorageWrapper<string>['set']>[0]>().toEqualTypeOf<string>();
        assertTypeOf<
            Parameters<LocalStorageWrapper<string | undefined>['set']>[0]
        >().toEqualTypeOf<string>();
    });

    it('should handle possibly undefined generics', () => {
        assertTypeOf<ReturnType<LocalStorageWrapper<string>['get']>>().toEqualTypeOf<string>();
        assertTypeOf<ReturnType<LocalStorageWrapper<string | undefined>['get']>>().toEqualTypeOf<
            string | undefined
        >();
        assertTypeOf<Parameters<LocalStorageWrapper<string>['set']>[0]>().toEqualTypeOf<string>();
        assertTypeOf<
            Parameters<LocalStorageWrapper<string | undefined>['set']>[0]
        >().toEqualTypeOf<string>();
    });
});
