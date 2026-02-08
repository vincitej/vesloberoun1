# Scripts

1. Vygeneruj bcrypt hash hesla:

```bash
node -e "const bcrypt=require('bcrypt'); console.log(bcrypt.hashSync('password',10));"
```

2. Vloz uzivatele do tabulky `users` (Postgres):

```sql
INSERT INTO users (username, password_hash)
VALUES (
    '<username>',
    '<password_hash>'
    )
ON CONFLICT (username)
DO UPDATE SET password_hash = EXCLUDED.password_hash
```

Poznamka: `username` musi byt unikatni.

`r.sehnoutkova` rs99beroun

`admin` admin26vkk
