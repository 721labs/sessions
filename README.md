# Sessions

A simple example of authentication sessions between a Metamask wallet and a friendly remote API.

## Getting Started

Run the web app with the following commands and then navigate to http://localhost:3000 in your web browser.  **Note:** you must first set up a Postgres database instance on your local machine and update the `DATABASE_URL` variable within `sample.env`.

```shell
# 1. Set Node Version
nvm use
# 2. Install dependencies
yarn
# 3. Create env file
cp sample.env >> .env
# 4. Migrate the database
npx prisma migrate dev --name init
# 5. Run the web app
yarn dev
```

## Notes

- The wallet's nonce should be refreshed (expire) periodically but that is beyond the scope of this demo.