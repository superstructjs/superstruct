import { union, string, number, object } from '../../../src'

const A = string()

const B = object({ a: number() })

export const Struct = union([A, B])

export const data = { a: 5, b: 5 }

export const output = { a: 5 }

export const mask = true
