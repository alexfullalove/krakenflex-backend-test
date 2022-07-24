# krakenflex-backend-test

## Introduction

Here is my solution to the Krakenflex backend test, below I have outlined the task, my solution and instructions on how to install, test and run the program

## The Task

1. The task was to retrieve a set of outages and information about a specific sit using `GET /outages` and
   `GET /site-info/{siteId}` endpoints respectively.

2. This data then had to be filtered to remove any outages that started before `2022-01-01T00:00:00.000Z` and also remove any outages that don't have an ID that is in the list of devices in the site information

3. Finally the data should be posted to `POST /site-outages/{siteId}` in the following format:

```json
[
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "name": "Battery 1",
    "begin": "2022-05-23T12:21:27.377Z",
    "end": "2022-11-13T02:16:38.905Z"
  },
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "name": "Battery 1",
    "begin": "2022-12-04T09:59:33.628Z",
    "end": "2022-12-12T22:35:13.815Z"
  },
  {
    "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
    "name": "Battery 2",
    "begin": "2022-07-12T16:31:47.254Z",
    "end": "2022-10-13T04:05:10.044Z"
  }
]
```

## Solution

I have utilised NodeJs, Typescript and Jest to write a simple program to gather and post the data, there is an api service which is responsible for fetching and posting the data, there is a logic service which is responsible for filtering and formatting the data to be posted back to the API. There is a suite of unit tests covering the happy path for the handler functions and also unit tests covering the logic for formatting of the data.

Some considerations:

- The program itself does not return any value but instead outputs success of failure to the console. As this program is specifically being run in the console simple logging seemed appropriate for the end user, although returns could be added in future if required.

- There was a bonus requirement to make the program resilient to 500 status codes, the current implementation makes use of a try catch block which should handle any api errors and print the status code and the error message to the console for the end user. Another solution could be to implement a system that would re-run the program a maxiumum number of 3 times should a 500 status code be returned, although this solution was not implemented in this program.

## How to Use

1. Fork and clone this repo and run the following command to install dependencies:

```bash
npm install
```

2.  To run the tests simply run the following command:

```bash
npm test
```

3. Before running the program you will first need to run the following command:

```bash
npm run build
```

4. You will then need to add a `.env` file to your build folder, inside this file you will need to add the following environment variables and add values where appropriate (you may have to close and re open your IDE at this point):

`API_BASE_URL=https://api.krakenflex.systems/interview-tests-mock-api/v1`
`API_KEY=<API_KEY>`

5. Finally you should now be able to run the program in the terminal with the following command:

```bash
npm run program
```
