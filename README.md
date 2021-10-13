## System Requirements

- [NodeJS][https://nodejs.org] `12 || 14 || 15 || 16`
- [npm][https://www.npmjs.com/] v6 or greater

All of these must be available in the project `PATH`. To verify things are set up
properly, run this:

```shell
node -v  or  node --version
npm -v  or  npm --version
```

## Setup

```
npm install
```

## Running the app

```shell
npm start
```

## Running the tests

```shell
npm test
```

This will start [Jest](https://jestjs.io/) in watch mode.

## App Data Model

- User

  - id: string
  - username: string

- List Item

  - id: string
  - bookId: string
  - ownerId: string
  - rating: number (-1 is no rating, otherwise it's 1-5)
  - notes: string
  - startDate: number (`Date.now()`)
  - finishDate: number (`Date.now()`)

> For convenience, our friendly backend engineers also return a `book` object on
> each list item which is the book it's associated to. Thanks backend folks!

> /me wishes we could use GraphQL

If "database" gets out of whack, you can purge it via:

```javascript
window.__bookshelf.purgeUsers()
window.__bookshelf.purgeListItems()
```

- Book

  - id: string
  - title: string
  - author: string
  - coverImageUrl: string
  - pageCount: number
  - publisher: string
  - synopsis: string

## References

This project was inspired by [Kent C. Dodds](https://epicreact.dev/)
