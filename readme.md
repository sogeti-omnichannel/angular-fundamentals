# Sogeti Angular course - Getting started
## Generate app, modules & components
- run `npm install -g @angular/cli` to install the Angular CLI globally.
- run `ng new tournament-app --routing` to generate a new project called 'tournament-app' and directly generate routing capabilities.
- run `cd tournament-app` to navigate to the generated directory.
- open a new terminal window, navigate to the tournament-app folder and run `npm start`. The Angular CLI already executed `npm install`, so no need to do this manually.

## Generate modules
Besides the default App module our app will get functionalities grouped into the Match and Player module.
- run `ng generate module match --routing`
- run `ng generate module player --routing`

Notice that when modules are generated only files are created. The parent App module is not updated with a reference of the generated modules. We'll have to specify the parent later on ourselves.

## Generate components
- run `ng generate component match/match-add`
- run `ng generate component match/match-list`
- run `ng generate component match/match-list-item`
- run `ng generate component player/player-rank`

Notice that when components are generated their specified module (Match and Player) are automatically modified to reference the generated component. 