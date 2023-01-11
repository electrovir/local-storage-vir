import {JsonValue, LiteralToPrimitive, Primitive} from 'type-fest';

export type ValueBase = Exclude<JsonValue, null>;

export type BroadenNonNullableType<OriginalType extends ValueBase | undefined> =
    NonNullable<OriginalType> extends Primitive
        ? LiteralToPrimitive<NonNullable<OriginalType>>
        : NonNullable<OriginalType>;

export type LocalStorageWrapper<ValueType extends ValueBase | undefined> = {
    key: string;
    remove: () => void;
    set: (newValue: BroadenNonNullableType<ValueType>) => void;
    get: () => ValueType extends undefined
        ? BroadenNonNullableType<ValueType> | undefined
        : BroadenNonNullableType<ValueType>;
};
