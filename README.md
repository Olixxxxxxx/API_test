# playwright-typescript-frontend-framework

## Getting started

This is framework for testing UI with typescript and playwright

## Preconditions

Install node and npm
Instal java for allure report


## Run tests

Go to the root of the project and execute commands from terminal:<br/>
    npm install<br/>
    npm run test


## Alure report

Allure report is created in the folder allure-report

## Playwright report

Playwright report is placed in the folder playwright-report

## Run tests in docker container

docker compose up

Playwright report is placed in the folder playwright-report

For allure report, run first "npx allure generate ./allure-results" and then "npx allure open ./allure-report" after text execution is completed

##  CI run

There is a .gitlab-ci.yml file for runing tests on Gitlab

## Parallel execution

You can control the number of parallel worker processes via the command line or configuration file:

npx playwright test  --project=chromium --workers 2

Configuration file:
    testConfig = {
    workers: process.env.CI ? 2 : undefined,
    };

## Disabling Parallelism

To disable parallelism, set the number of workers to one:

npx playwright test --project=chromium --workers 1

## Run in headless mode

With current settings, test run in headed mode, and headless mode in docker container.
For running in headless mode on your locale machine set headless on true