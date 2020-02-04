# Checador

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Add a fake json server to test frontend
For this, you're gonna type in a new bash:

npm install -g json-server

(-g means it is globaly)

Then you're gonna create a file named db.json at the main folder of the application and you are going to fill it with a json format like this:

{
    "weekly": [
        { "name": "Antonio Nevarez", "totalMinutes": 0 },
        { "name": "Alfa Venegas", "totalMinutes": 92 }
    ],
    "daily": [
        { "name": "Antonio Nevarez", "totalMinutes": 0, "pto": false },
        { "name": "Jemmy Preciado", "totalMinutes": 1, "pto": false }
    ]
}

To get the data in your web app, you just have to call it like:

 http://localhost:3000/weekly

And at last, you're going to execute json-server --watch db.json on your terminal, at the same time of your frontend app in another terminal

as resposne you'll get somethig like:

{ "name": "Antonio Nevarez", "totalMinutes": 0 },
        { "name": "Alfa Venegas", "totalMinutes": 92 }

## Generate UnitTest Code with JEST
JEST is a dependency which will help you to autogenerate unit testing files and code for the frontend, based on the interactions and services we define in the TS code, it ONLY generates 60% of the code, you have to create more cases based on the behavior of your component

To generate the UnitTest Code with JEST, you only have to run:

ngentest path/of/your/component.ts

And it will be shown in the terminal, you copy that code and paste it into the name.component.spec.ts file

It's recomended to import in your components with a relative path ("././") so JEST can find the file you are importing in the file you want to test