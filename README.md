# NestJS-Application-Simply

## Installation

```bash
cd shopify-backend

$ yarn install
```

## Migration
Note: The TypeORM is not setting to auto synchronize between entity and DB table when application booting. If you wish to migration database, please using following command.
### Create new migration
```bash
$ yarn run migrate:create <migration name>
```
### Migrate database
```bash
$ yarn run migrate:up
```
## Running the app

```bash
# development
$ yarn run start

```
