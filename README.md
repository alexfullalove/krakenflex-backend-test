# krakenflex-backend-test

## Introduction

Here is my solution to the Krakenflex backend test, below I have outlined the task, my solution and instructions on how to install, test and run the program

## The Task

1. The task was to retrieve a set of outages and information about a specific sit using `GET /outages` and `GET /site-info/{siteId}` endpoints respectively.

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

## How to Use
