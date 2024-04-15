## Init Project
### 1. Init NPM project
```bash
$ npm init
```
### 2. Install parcel
```bash
$ npm i parcel@2
```
### 3. Try running project, it will install dependency saas instantly.
```bash
$ npm start
```

## Chapter 291:
### 1. Try install npm packages
```bash
$ npm i core-js regenerator-runtime
```

## Chapter 292:
### Architecture:
- Like a house, software needs a structure: the way we organize our code.
- A project is never done!, We need to be able to easily change it in the future.
- We also need to be able to easily add new features.
- key focuses:
  - Maintainabilty
  - Structure
  - Expandability
#### Type of architectures:
- We can use our own architecture. (in small projects)
- We can use a well-established architecture pattern like MVC, MVP, Flux, etc.
- We can use framework like 'React', 'Angular', 'Vue', 'Svelte, etc.

#### Components of any architecture:
- Business Logic: 
  - Code that solves the actual business problem.
  - Directly related to what business does, and what it needs;
  - Example: sending messages, stroing transactions, calculating taxes;
- State:
  - Essentially stores all the data about the application.
  - Should be the "single source of truth"
  - UI should be kept in sync with the state.
  - State libraries exists like 'Redux', 'Mobx'
  - Keeping in sync with 'Presentation Logic'
- HTTP Library:
  - Responsible for making and receiving AJAX requests.
  - Optional but always necessary in real-world apps.
  - Examples: 'fetch' function
- Application Logic (Router):
  - Code that is only concerned about the implementation of the application itself.
  - Handles navigation and UI events;
- Presentation Logic (UI Layer);
  - Code that is concerned about the visible part of the application;
  - Essentially displays application state.
  - Keeping in sync with 'State'

#### The Model-View-Controller (MVC) architecture
- Model:
  - Business Logic
  - State
  - HTTP Library
  - **Model is standalone (Does not imported 'Controller'/'View')**

- Controller:
  - Application Logic
  - **Bridge between model and views, orchestrating whole application.**

- View:
  - Presentation Logic show to User
  - **View is standalone (Does not imported 'Controller'/'Model')**
        
#### MVC Flows
  - 1) Show UI to the user
    - Views --display---> Users
  - 2) User interact with the UI, Controller handling an event from the user.
    - User  --interact--> Controller
  - 3) Controller dispatch getting data to the 'Model' and transfer data to the 'View'
    - Controller --request data--> Model
    - Controller --notify data loading--> View
    - Model --AJAX calls--> WEB API
    - API --DATA--> Model
    - Model --DATA--> Controller
    - Controller --updated DATA--> View
  - 4) Views show updated UI to the user
    - Views --display--> Users
    

## Chapter 293:
   - Install 3rd party lib.
```bash
    $ npm install fractional
```

## Chapter 295:
### Event Handling in MVC: Publisher-Subscriber pattern
    - Events should be handled in the controller (otherwise we would have application logic in the view)
    - Events should be listened for in the view (otherwise we sould need DOM elements in the controller)
#### Publisher: Code that knows when to react
    - Class recipeView.js = Publisher
#### Subscriber: Code that wants to react
    - Module controller.js = Subscriber
#### Flows:
##### 1) controlRecipes() will be passed into addHandlerRender when program starts
 - initialization 'init()' [controller.js] injectFunction:'controlRecipes()' into addHandlerRender() [receipeView.js]
##### 2) addHandlerRender listens for events (addEvenListener), and uses controlRecipes as callback
 - User clicks search result [receipveView.js]
 - Event trigger function call 'controlRecipes()'

##### Note: see diagram 'forkify-architecture-recipe-loading.png';