# Cloud9 League of Legends Patch Notes Tool

Greetings! This repo contains the webscraper and React project for displaying champions patch data on a uniform and centralized webpage.

The webscraper, built using Python 3.6 and the Beautiful Soup package, parses the HTML tree from https://www.leagueoflegends.com/en-us/news/game-updates/ patch notes.
This data is transformed into a JSON object for the UI to consume.

The website, built using React with TypeScript, shows a rundown for all the changes to champions in a given patch.
![Hackathon_2021](https://user-images.githubusercontent.com/11247624/137411810-21598747-098b-4a2e-bd86-e2ba07a4408e.PNG)



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

### `python webscraper.py`

To use the webscraper to generate your own JSON data, run the following:
```
cd tools
pip install -r requirements.txt
python .\webscraper.py
```

Thank you!

