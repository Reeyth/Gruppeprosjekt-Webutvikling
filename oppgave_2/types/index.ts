export type Data = { status: true; data: Record<string, unknown> }
export type Error = { status: false; error: string }

export type Result = Data | Error

export enum TableType {
  AGE = 'age',
  GENDER = 'gender',
  GROUP = 'group',
  DEFAULT = 'none',
}
