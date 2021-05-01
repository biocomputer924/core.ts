export default null as A

type A = import("core/nullable").default<(x: string) => Promise<unknown>>
