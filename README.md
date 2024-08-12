# Prisma setup

1. npm i -g vercel@latest
2. vercel env pull .env.development.local
3. Add .env to .gitignore
4. npm install prisma --save-dev
5. npx prisma init
6. Add following code:

```javascript
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}

model Post {
  id        String     @default(cuid()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  String?
}

model User {
  id            String       @default(cuid()) @id
  name          String?
  email         String?   @unique
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @updatedAt @map(name: "updated_at")
  posts         Post[]
  @@map(name: "users")
}
```

7. npx prisma db push
8. (optional) npx prisma studio
9. npm install @prisma/client
10. npx prisma generate
11. Add following code to src/lib/prisma.js:

```javascript
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

12. Test it in server actions or api using:

```javascript
import prisma from "@/lib/prisma";
```

13. Edit .eslintrc.json file to:

```javascript
{
  "extends": ["next", "next/core-web-vitals"]
}
```

14. Add build and postImstall commands to package.json:

```javascript
"build": "prisma generate && next build",
"postinstall": "prisma generate",
```
