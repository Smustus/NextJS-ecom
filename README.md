This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
<br><br>
Full-Stack Webshop in NextJS
<br><br>
SQLite database
<br><br>
Dependancies:
<br>
ORM - Prisma
<br>
Validation - Zod
<br>
Payment - Stripe
<br><br>
Admin Page
<br>
username: admin
<br>
password: admin
<br><br>

## Getting Started

First, install all dependancies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Second, create a .env file in your root folder and enter your database url, username and password for admin access and stripe keys.
```bash
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=admin
ADMIN_HASHED_PASSWORD=x61Ey612Kl2gpFL56FT9weDnpSo4AV8j8+qx2AuTHdRyY036xxzTTrw10Wq3+4qQyB+XURPWx1ONxp3Y3pB37A==
STRIPE_SECRET_KEY=**********
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=************
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
---------------------------------------------------------------------------------------------------------------

