# Cloud9 League of Legends Patch Notes Tool

Greetings! This repo contains the webscraper and React project for displaying champions patch data on a uniform and centralized webpage.

The webscraper, built using Python 3.6 and the Beautiful Soup package, parses the HTML tree from https://www.leagueoflegends.com/en-us/news/game-updates/ patch notes.
This data is transformed into a JSON object for the UI to consume.

The website, built using React with TypeScript, shows a rundown for all the changes to champions in a given patch.

Thank you!

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
