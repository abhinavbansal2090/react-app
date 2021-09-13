export interface Action<T extends any> {
  type: T
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

type ActionFunction = (...args: any[]) => Action<string>

type ActionFunctions<T> = { [key: string]: T }

export type ActionsUnion<
  A extends ActionFunctions<ActionFunction>
> = ReturnType<A[keyof A]>
