# Dungeons and Dragons API Browser

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), server powered by Node.js, Express, and [Dungeons and Dragons 5th Edition API](https://www.dnd5eapi.co/). This was created to demonstrate proficiency with Next.js and AWS Lambda.

## Getting Started

After unzipping the contents of the containing zip file to a directory, open a terminal and navigate to the folder. Run the install command to install relevant Node packages.

```
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the API browser.

## Lambda Function

A Node/Express API server was created to handle the database requests of the project's front end. The server receives requests from the front end, then in turn invokes the [Dungeons and Dragons 5th Edition API](https://www.dnd5eapi.co/) to receive the list of spells and races as well as searches for the first item in each list to populate the page on loading. This process was later ported to a Lambda function bootstrapped from a [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) template. Refer to the ``app.js`` file in the ``lambda`` directory of this project to see the code utilized for the Lambda function.

## Next.js Front-End
The front end was created with Next.js and has two pages to navigate to, one to display player races and one to display spells. Both call on the  lambda function to retrieve the information for each category via the `axios` package.

## SEO
The spells and races now have individualized, dynamically generated routes. Given that I as running into issues with serving pages via Amazon S3 (namely they would not index the page's content), I instead switched to deployment via [`Vercel`](https://vercel.com/). I used the `getStaticPaths`/`getStaticProps` methods to generate the routes. This allows pages to be properly indexed by Google despite the browser being a single page application. Error handling has also been included in case of hiccups in the interaction with the API.
