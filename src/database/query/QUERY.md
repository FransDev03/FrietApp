# SQLite Query Examples

## Open Database

It is recommended to install the dotenv package and get the databasename this way, this value can be changed in the openDatabase.ts file

## Importing functions

All current supported functions

```typescript
import {
    execute,
    tableInfo,
    createTable,
    renameTable,
    updateTable,
    dropTable,
    insert,
    update,
    search,
    deleteRow,
} from './query';
```

## Alter Table Functions

### Create Table

This function will create table with IF NOT EXISTS operator.

-   First argument: table
-   Second argument: columns

#### Example:

```typescript
createTable('items', {
    id: 'CHAR(36) PRIMARY KEY NOT NULL',
    name: 'VARCHAR(90)',
});
```

will execute:

```sql
CREATE TABLE IF NOT EXISTS items (id CHAR(36) PRIMARY KEY NOT NULL, name VARCHAR(90));
```

### Rename Table

A simple function to rename a SQLite table

-   First argument: old table name
-   Second argument: new table name

#### Example:

```typescript
renameTable('oldTableName', 'newTableName');
```

will execute:

```sql
ALTER TABLE oldTableName RENAME TO newTableName;
```

### Update Table

-   First argument: table name
-   Second argument: add, edit or delete 1 or more columns

#### Example:

```typescript
updateTable('items', {
    // After is optional
    add: [{ title: 'VARCHAR(45)', after: 'id' }],
    edit: [{ name: 'item_name' }],
    delete: ['name'],
});
```

will execute:

add:

```sql
ALTER TABLE RENAME TO tmp_items;
CREATE TABLE items (id CHAR(36) PRIMARY KEY NOT NULL, title VARCHAR(45), name VARCHAR(90));
INSERT INTO items (id, name) SELECT id, name FROM tmp_items;
DROP TABLE tmp_items;
```

edit:

```sql
ALTER TABLE items RENAME name TO item_name;
```

delete:

```sql
ALTER TABLE RENAME TO tmp_items;
CREATE TABLE items (id CHAR(36) PRIMARY KEY NOT NULL);
INSERT INTO items (id) SELECT id FROM tmp_items;
DROP TABLE tmp_items;
```

### Drop Table

This function will delete entered table with IF EXISTS operator.

-   First argument: table name

```typescript
dropTable('items');
```

will execute:

```sql
DROP TABLE IF EXISTS items;
```

## Alter Row Functions

### Select Row(s)

In this function you can fetch rows based on the given arguments
If you want to join multiple tables you can pass an array with objects instead of an array

Default join is INNER JOIN

-   First argument:

    -   Table
    -   Select
    -   Join
    -   Where:
        operator?: `AND` or `OR`
    -   Sort

Example:

```typescript
search({
    table: 'items',
    where: {
        // String entered. This will execute with the `=` symbol
        id: '1',
        // Array entered. This will execute with LIKE operator
        name: ["first%", "LIKE"],
        // Operator is optional. Default value is AND
        operator: "OR".
    },
});
```

will execute:

```sql
SELECT * FROM items WHERE id = "1" OR name LIKE "first%";
```

Another example:

```typescript
search({
    table: 'items',
    select: ['items.title', 'item_names.name'],
    join: {
        table: "item_names",
        id: "items_id",
        type: "left",
    }
    sort: { order: ['title', 'name'], asc: false },
});
```

will execute:

```sql
SELECT items.title, item_names.name FROM items LEFT JOIN item_names ON item_names.item_id = items.id ORDER BY title DESC;
```

### Insert Row(s)

Insert 1 or multiple rows

-   First argument: table name
-   Second argument: rows to be added

```typescript
insert('items', [
    {
        id: '1',
        name: 'item name',
    },
    {
        id: '2',
        name: 'second item name',
    },
]);
```

will execute:

```sql
INSERT INTO items (id, name) VALUES ("1", "item name"), ("2", "second item name");
```

### Update Row

This function will update values based on filters in third argument

-   First argument: table name
-   Second argument: values to be updated
-   Third argument: filter for rows to be updated

```typescript
update(
    'items',
    {
        title: 'updated title',
        name: 'updated name',
    },
    {
        id: '1',
    },
);
```

will execute:

```sql
UPDATE TABLE SET title = "updated title", name = "updated name" WHERE id = "1";
```

### Delete Row

Deletes 1 or multiple rows based on given condition(s). If no condition is entered all rows will be removed

-   First argument: table name
-   Second argument: conditions (where)

```typescript
deleteRow('items', { id: '2' });
```

will execute:

```sql
DELETE FROM items WHERE id = "2";
```

## Execute SQLite Query

If any of these functions do not match with your needs you can use the following function to execute a SQLite query. Here you can also make use of a prepared statement by replacing the intended value(s) with `?` in order to prevent SQL injection, then adding the value(s) in an array in correct order as second argument

-   First parameter: query to be executed
-   Second parameter: values for prepared statement

```typescript
execute('SELECT title, name FROM items WHERE id = ?', [id]);
```
