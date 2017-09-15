# reign design test


## Prerequisites
1. node and yarn package manager installed 

2. mongo database running in localhost in the default mongo port.

## Running the app
1. clone the repo and cd into it
2. type the command `yarn` and hit enter to install the packages
3. type the command `yarn start` and hit enter to run the app
4. point your browser to localhost:3000 to see the app running.

## Description
This is an app that fetches the most recent posts in hacker new using this url:
```
https://hn.algolia.com/api/v1/search_by_date?query=nodejs
```
We need to fetch the content on the api every hour so I thought I could use a cron job for that, then I realized that I could just use setInterval to fetch content every hour since the app started.

Also I made the app so that the database resets everytime the app starts, to see the effect better (without having to wait 1hr)
change the interval parameter in the line 11 of `server/index.js`
```
  const df = new DataFetch({interval: 60}) // interval in minutes (1hr)

```
you can change it to `interval:0.5` so you can see the app fetching and saving data every 30 seconds
