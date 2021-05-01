export default <A, B>(f: (this: A) => B, a: A) => f.call(a)
