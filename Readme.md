<p align="center">
  <a href="#"><img src="./docs/images/banner.png" /></a>
</p>

<p align="center">
  A simple and composable way  <br/>
  to validate data in JavaScript (and TypeScript).
</p>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#why">Why?</a> •
  <a href="#principles">Principles</a> •
  <a href="#demo">Demo</a> •
  <a href="#examples">Examples</a> •
  <a href="#documentation">Documentation</a>
</p>

<p align="center">
  <a href="https://bundlephobia.com/package/@superstruct/core">
    <img src="https://badgen.net/bundlephobia/minzip/@superstruct/core?color=green&label=size">
  </a>

  <a href="./package.json">
    <img src="https://badgen.net/npm/v/superstruct?color=blue&label=version">
  </a>
</p>

> This is a community-maintained fork of the [original superstruct](https://github.com/ianstormtaylor/superstruct) by @ianstormtaylor. [Why the fork?](./docs/community-edition.md)

Superstruct makes it easy to define interfaces and then validate JavaScript data against them. Its type annotation API was inspired by [Typescript](https://www.typescriptlang.org/docs/handbook/basic-types.html), [Flow](https://flow.org/en/docs/types/), [Go](https://gobyexample.com/structs), and [GraphQL](http://graphql.org/learn/schema/), giving it a familiar and easy to understand API.

But Superstruct is designed for validating data at runtime, so it throws (or returns) detailed runtime errors for you or your end users. This is especially useful in situations like accepting arbitrary input in a REST or GraphQL API. But it can even be used to validate internal data structures at runtime when needed.

### Usage

Superstruct allows you to define the shape of data you want to validate:

```js
import { assert, object, number, string, array } from '@superstruct/core'

const Article = object({
  id: number(),
  title: string(),
  tags: array(string()),
  author: object({
    id: number(),
  }),
})

const data = {
  id: 34,
  title: 'Hello World',
  tags: ['news', 'features'],
  author: {
    id: 1,
  },
}

assert(data, Article)
// This will throw an error when the data is invalid.
// If you'd rather not throw, you can use `is()` or `validate()`.
```

Superstruct ships with validators for all the common JavaScript data types, and you can define custom ones too:

```js
import { is, define, object, string } from '@superstruct/core'
import isUuid from 'is-uuid'
import isEmail from 'is-email'

const Email = define('Email', isEmail)
const Uuid = define('Uuid', isUuid.v4)

const User = object({
  id: Uuid,
  email: Email,
  name: string(),
})

const data = {
  id: 'c8d63140-a1f7-45e0-bfc6-df72973fea86',
  email: 'jane@example.com',
  name: 'Jane',
}

if (is(data, User)) {
  // Your data is guaranteed to be valid in this block.
}
```

Superstruct can also handle coercion of your data before validating it, for example to mix in default values:

```ts
import { create, object, number, string, defaulted } from '@superstruct/core'

let i = 0

const User = object({
  id: defaulted(number(), () => i++),
  name: string(),
})

const data = {
  name: 'Jane',
}

// You can apply the defaults to your data while validating.
const user = create(data, User)
// {
//   id: 0,
//   name: 'Jane',
// }
```

And if you use TypeScript, Superstruct automatically ensures that your data has proper typings whenever you validate it:

```ts
import { is, object, number, string } from '@superstruct/core'

const User = object({
  id: number(),
  name: string()
})

const data: unknown = { ... }

if (is(data, User)) {
  // TypeScript knows the shape of `data` here, so it is safe to access
  // properties like `data.id` and `data.name`.
}
```

Superstruct supports more complex use cases too like defining arrays or nested objects, composing structs inside each other, returning errors instead of throwing them, and more! For more information read the full [Documentation](#documentation).

### Why?

There are lots of existing validation libraries—[`joi`](https://github.com/hapijs/joi), [`express-validator`](https://github.com/ctavan/express-validator), [`validator.js`](https://github.com/chriso/validator.js), [`yup`](https://github.com/jquense/yup), [`ajv`](https://github.com/epoberezkin/ajv), [`is-my-json-valid`](https://github.com/mafintosh/is-my-json-valid)... But they exhibit many issues that lead to your codebase becoming hard to maintain...

- **They don't expose detailed errors.** Many validators simply return string-only errors or booleans without any details as to why, making it difficult to customize the errors to be helpful for end-users.

- **They make custom types hard.** Many validators ship with built-in types like emails, URLs, UUIDs, etc. with no way to know what they check for, and complicated APIs for defining new types.

- **They don't encourage single sources of truth.** Many existing APIs encourage re-defining custom data types over and over, with the source of truth being spread out across your entire code base.

- **They don't throw errors.** Many don't actually throw the errors, forcing you to wrap everywhere. Although helpful in the days of callbacks, not using `throw` in modern JavaScript makes code much more complex.

- **They're tightly coupled to other concerns.** Many validators are tightly coupled to Express or other frameworks, which results in one-off, confusing code that isn't reusable across your code base.

- **They use JSON Schema.** Don't get me wrong, JSON Schema _can_ be useful. But it's kind of like HATEOAS—it's usually way more complexity than you need and you aren't using any of its benefits. (Sorry, I said it.)

Of course, not every validation library suffers from all of these issues, but most of them exhibit at least one. If you've run into this problem before, you might like Superstruct.

Which brings me to how Superstruct solves these issues...

### Principles

1. **Customizable types.** Superstruct's power is in making it easy to define an entire set of custom data types that are specific to your application, and defined in a _single_ place, so you have full control over your requirements.

2. **Unopinionated defaults.** Superstruct ships with native JavaScript types, and everything else is customizable, so you never have to fight to override decisions made by "core" that differ from your application's needs.

3. **Composable interfaces.** Superstruct interfaces are composable, so you can break down commonly-repeated pieces of data into components, and compose them to build up the more complex objects.

4. **Useful errors.** The errors that Superstruct throws contain all the information you need to convert them into your own application-specific errors easy, which means more helpful errors for your end users!

5. **Familiar API.** The Superstruct API was heavily inspired by [Typescript](https://www.typescriptlang.org/docs/handbook/basic-types.html), [Flow](https://flow.org/en/docs/types/), [Go](https://gobyexample.com/structs), and [GraphQL](http://graphql.org/learn/schema/). If you're familiar with any of those, then its schema definition API will feel very natural to use, so you can get started quickly.

### Demo

Try out the [live demo on CodeSandbox](https://codesandbox.io/s/epic-haslett-3tzq2n?file=/index.js) to get an idea for how the API works, or to quickly verify your use case:

[![Demo screenshot.](./docs/images/demo-screenshot.png)](https://codesandbox.io/s/epic-haslett-3tzq2n?file=/index.js)

### Examples

Superstruct's API is very flexible, allowing it to be used for a variety of use cases on your servers and in the browser. Here are a few examples of common patterns...

- [Basic Validation](./examples/basic-validation.js)
- [Custom Types](./examples/custom-types.js)
- [Default Values](./examples/default-values.js)
- [Optional Values](./examples/optional-values.js)
- [Composing Structs](./examples/composing-structs.js)
- [Throwing Errors](./examples/throwing-errors.js)
- [Returning Errors](./examples/returning-errors.js)
- [Testing Values](./examples/testing-values.js)
- [Custom Errors](./examples/custom-errors.js)

### Documentation

Read the getting started guide to familiarize yourself with how Superstruct works. After that, check out the full API reference for more detailed information about structs, types and errors...

- [**Guide**](./docs/guides/01-getting-started)
  - [Getting Started](./docs/guides/01-getting-started)
  - [Validating Data](./docs/guides/02-validating-data)
  - [Coercing Data](./docs/guides/03-coercing-data)
  - [Refining Validation](./docs/guides/04-refining-validation)
  - [Handling Errors](./docs/guides/05-handling-errors)
  - [Using TypeScript](./docs/guides/06-using-typescript)
- [**Reference**](./docs/api-reference/core)
  - [Core](./docs/api-reference/core)
  - [Types](./docs/api-reference/types)
  - [Refinements](./docs/api-reference/refinements)
  - [Coercions](./docs/api-reference/coercions)
  - [Utilities](./docs/api-reference/utilities)
  - [Errors](./docs/api-reference/errors)
  - [TypeScript](./docs/api-reference/typescript)
- [**FAQ**](./docs/resources/faq)
- [**Resources**](./docs/resources/links)

### License

This package is [MIT-licensed](./License.md).
