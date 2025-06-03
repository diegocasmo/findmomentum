# [https://www.findmomentum.xyz](https://www.findmomentum.xyz)

A productivity app that helps track and celebrate daily progress through small wins.

## Installation

1. Clone the repository

2. Install [asdf](https://github.com/asdf-vm/asdf) and plugins

``` bash
asdf plugin add nodejs
asdf plugin add yarn
asdf plugin add postgres
```

3. Run `asdf` install

```bash
asdf install
```

4. Set up the environment variables:
- Copy the `.env.example` file to `.env`:

``` bash
cp .env.example .env
```

- Open the `.env` file and fill in the necessary environment variables, including your PostgreSQL database URL

5. Set up Prisma and the database:
- Generate Prisma client:

``` bash
yarn prisma generate
```

   - Run migrations and seed initial data:

 ``` bash
 yarn prisma migrate dev
 ```

These commands will set up your database schema, apply all existing migrations, and populate the database with seed data.

6. Install dependencies and start the development server

``` bash
yarn
yarn dev
```
