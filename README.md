## Solace Candidate Assignment

## Pull Requests

1. [Part 1: Implement Typings](https://github.com/leungk712/solace/tree/refactor/implement-typings-pt-1)
2. [Part 2: Update Search Logic and Table](https://github.com/leungk712/solace/tree/refactor/update-search-logic-pt-2)
3. [Part 3: Update UI](https://github.com/leungk712/solace/tree/refactor/update-ui-pt-3)
4. [Part 4: Documentation](https://github.com/leungk712/solace/tree/docs/update-documentation-pt-4)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```
