This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Set Up Mailtrap

- Go to the [Mailtrap](https://mailtrap.io/) and open a new account in mailtrap
- Then go to the email testing section till now this website mail is limited to testing phase
- Then go to inboxes if not present create one
- Then in the integration search for `nodemailer` as we are using Node.js
- Then copy the code and go to `src/helpers/Mailer.ts` and you will find the similar piece of code paste there but carefully look at the variable names
- Finally add the user and password of mailtrap as a `.env` variable and give name as `MAILTRAP_USER` and `MAILTRAP_PASSWORD` respectively

## Add other .env variables

- As this project using mongoDB you can use your local mongoDB server or mongoDB Atlas. Main thing is just add the connection url in the `.env` file as `MONGO_URL`

- Before hosting the project add the `http://localhost:3000` as a  `DOMAIN` variable in the `.env` file

- As we using JWT for authentication add your choose string as `TOKEN_SECRET` variable in the `.env` file but your given string must be long for better working

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
