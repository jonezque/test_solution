/* eslint-disable @typescript-eslint/no-explicit-any */
export const enumToArray = (Enum: any): any[] => Object.keys(Enum).map(key => ({ id: Enum[key], name: key } as any));
export const enumKeysToArray = (Enum: any): any[] => Object.keys(Enum);
