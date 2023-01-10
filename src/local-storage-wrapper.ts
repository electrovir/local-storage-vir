import {JsonValue, LiteralToPrimitive, Primitive} from 'type-fest';

export type BroadenNonNullableType<OriginalType extends Exclude<JsonValue, null> | undefined> =
    NonNullable<OriginalType> extends Primitive
        ? LiteralToPrimitive<NonNullable<OriginalType>>
        : NonNullable<OriginalType>;

export type LocalStorageWrapper<ValueType extends Exclude<JsonValue, null> | undefined> = {
    key: string;
    remove: () => void;
    set: (newValue: BroadenNonNullableType<ValueType>) => void;
    get: () => ValueType extends undefined
        ? BroadenNonNullableType<ValueType> | undefined
        : BroadenNonNullableType<ValueType>;
};
