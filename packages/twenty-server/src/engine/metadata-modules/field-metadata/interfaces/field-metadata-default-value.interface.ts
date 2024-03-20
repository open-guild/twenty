import {
  FieldMetadataDefaultValueBoolean,
  FieldMetadataDefaultValueCurrency,
  FieldMetadataDefaultValueDateTime,
  FieldMetadataDefaultValueFullName,
  FieldMetadataDefaultValueJson,
  FieldMetadataDefaultValueLink,
  FieldMetadataDefaultValueNumber,
  FieldMetadataDefaultValueString,
  FieldMetadataDefaultValueStringArray,
  FieldMetadataDefaultValueUuidFunction,
  FieldMetadataDefaultValueNowFunction,
} from 'src/engine/metadata-modules/field-metadata/dtos/default-value.input';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';

type FieldMetadataScalarDefaultValue =
  | FieldMetadataDefaultValueString
  | FieldMetadataDefaultValueNumber
  | FieldMetadataDefaultValueBoolean
  | FieldMetadataDefaultValueDateTime;

export type FieldMetadataFunctionDefaultValue =
  | FieldMetadataDefaultValueUuidFunction
  | FieldMetadataDefaultValueNowFunction;

type AllFieldMetadataDefaultValueTypes =
  | FieldMetadataScalarDefaultValue
  | FieldMetadataFunctionDefaultValue
  | FieldMetadataDefaultValueLink
  | FieldMetadataDefaultValueCurrency
  | FieldMetadataDefaultValueFullName;

type FieldMetadataDefaultValueMapping = {
  [FieldMetadataType.UUID]:
    | FieldMetadataDefaultValueString
    | FieldMetadataDefaultValueUuidFunction;
  [FieldMetadataType.TEXT]: FieldMetadataDefaultValueString;
  [FieldMetadataType.PHONE]: FieldMetadataDefaultValueString;
  [FieldMetadataType.EMAIL]: FieldMetadataDefaultValueString;
  [FieldMetadataType.DATE_TIME]:
    | FieldMetadataDefaultValueDateTime
    | FieldMetadataDefaultValueNowFunction;
  [FieldMetadataType.BOOLEAN]: FieldMetadataDefaultValueBoolean;
  [FieldMetadataType.NUMBER]: FieldMetadataDefaultValueNumber;
  [FieldMetadataType.POSITION]: FieldMetadataDefaultValueNumber;
  [FieldMetadataType.NUMERIC]: FieldMetadataDefaultValueString;
  [FieldMetadataType.PROBABILITY]: FieldMetadataDefaultValueNumber;
  [FieldMetadataType.LINK]: FieldMetadataDefaultValueLink;
  [FieldMetadataType.CURRENCY]: FieldMetadataDefaultValueCurrency;
  [FieldMetadataType.FULL_NAME]: FieldMetadataDefaultValueFullName;
  [FieldMetadataType.RATING]: FieldMetadataDefaultValueString;
  [FieldMetadataType.SELECT]: FieldMetadataDefaultValueString;
  [FieldMetadataType.MULTI_SELECT]: FieldMetadataDefaultValueStringArray;
  [FieldMetadataType.JSON]: FieldMetadataDefaultValueJson;
};

type DefaultValueByFieldMetadata<T extends FieldMetadataType | 'default'> = [
  T,
] extends [keyof FieldMetadataDefaultValueMapping]
  ? FieldMetadataDefaultValueMapping[T] | null
  : T extends 'default'
    ? AllFieldMetadataDefaultValueTypes | null
    : never;

export type FieldMetadataDefaultValue<
  T extends FieldMetadataType | 'default' = 'default',
> = DefaultValueByFieldMetadata<T>;

type FieldMetadataDefaultValueExtractNestedType<T> = T extends {
  value: infer U;
}
  ? U
  : T extends object
    ? { [K in keyof T]: T[K] } extends { value: infer V }
      ? V
      : T[keyof T]
    : never;

type FieldMetadataDefaultValueExtractedTypes = {
  [K in keyof FieldMetadataDefaultValueMapping]: FieldMetadataDefaultValueExtractNestedType<
    FieldMetadataDefaultValueMapping[K]
  >;
};

export type FieldMetadataDefaultSerializableValue =
  | FieldMetadataDefaultValueExtractedTypes[keyof FieldMetadataDefaultValueExtractedTypes]
  | null;
