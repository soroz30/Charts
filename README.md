# STXNext JS recruitment task

Welcome to the STXNext JavaScript recruitment task.

This task was developed in order to test the basic skillset of a JavaScript developer.

The task consists of backend and frontend functionalities.

You don't do backend? Remember that the *ability to learn* is the most sought quality in a developer!

First, clone this repo and install backend dependencies. Run the backend service.

## The application

The goal of the application is to display how stock prices change over time.

In this starter template you get:
* A backend application written in `node.js` that serves information about stocks (for the last 10 hours).
* A frontend template that renders an empty chart and static spinner.

Getting stock data has a **10% chance of failure** (by design). The application needs to account for that.

## Mission objectives

* Display the spinner while data is loading. Make the spinner rotate using CSS3.
* Query the backend for list of available stocks.
* Query the backend for data about each stock.
* Hide the spinner after all data is loaded.
* Plot the stock data on the chart (as a line chart).
* Display a chart legend (which line corresponds to which stock).
* Each stock should be plotted visually different (for example in a different colour).
* Display error message if some stock could not be loaded (that stock should not be plotted, but other stocks should still be plotted).
* Describe the chart axes.
* Fix backend to return a meaningful error message when stock data cannot be retrieved (now the request just hangs!).

## Constraints

* You are **not** to modify the code in `stocks.js`
* The stocks API is designed to return errors sometimes. The application should gain the ability to cope with that.
* You can use the provided mini-API for canvas operations, but you can also use other solution.
* We highly encourage you to use `fetch` API for making backend queries from the frontend.

## Submission

* To submit your solution please generate a **patch** from your changes and email it back to the STX Next recruiter that contacted you earlier.
* Don't worry if you didn't manage to fulfill *all* objectives. We will be happy to see partial solutions as well!
* Please **don't fork** this repository. We wouldn't want other candidates to base their work off your code!
