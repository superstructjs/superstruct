import { union, string, number, defaulted } from '../../../src'

const A = defaulted(string(), 'foo')
const B = number()

export const Struct = union([A, B])

export const data = undefined

export const failures = [
  {
    value: undefined,
    type: 'union',
    refinement: undefined,
    path: [],
    branch: [data],
  },
  {
    value: undefined,
    type: 'string',
    refinement: undefined,
    path: [],
    branch: [data],
  },
  {
    value: undefined,
    type: 'number',
    refinement: undefined,
    path: [],
    branch: [data],
  },
]

// For this test, we explicitly do not want to run coercion

export const create = false
