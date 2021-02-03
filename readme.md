# Sogeti Angular course - Getting started
## Modules
0. [Core Concepts](https://github.com/sogeti-omnichannel/angular-fundamentals)
1. **Getting started**
1. [Routing](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/2-routing)
1. [Components & Services](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/3-components-and-services)
1. [Forms](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/4-forms)
1. [Observables](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/5-observables)
1. [Bonus](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/6-bonus)
## Generate app, modules & components
- run `npm install -g @angular/cli` to install the Angular CLI globally.
- run `ng new tournament-app --routing --strict` to generate a new project called 'tournament-app' and directly generate routing capabilities.
- choose `CSS` as stylesheet format
- run `cd tournament-app` to navigate to the generated directory.
- open a new terminal window, navigate to the tournament-app folder and run `npm start`. The Angular CLI already executed `npm install`, so no need to do this manually.

## Generate modules
Besides the default App module our app will get functionalities grouped into the Match and Player module.
- run `ng generate module match --routing`
- run `ng generate module player --routing`

Notice that when modules are generated only files are created. The parent App module is not updated with a reference of the generated modules. We'll have to specify the parent ourselves.
- import MatchModule and PlayerModule in the app.module.ts and reference them in the imports array.

**src/app/app.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchModule } from './match/match.module';
import { PlayerModule } from './player/player.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlayerModule,
    MatchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Generate components
- run `ng generate component match/match-add`
- run `ng generate component match/match-list`
- run `ng generate component match/match-list-item`
- run `ng generate component player/player-rank`

Notice that when components are generated their specified module (Match and Player) are automatically modified to reference the generated component. 

## Clean up app component
The app component contains a lot of sample code. We will build it up from scratch, so start by removing its content and adding a title.

**src/app/app.component.html**
```html
<h1>Tournament app</h1>
```

## Adding Bootstrap as dependency
We are going to use basic Bootstrap to style our app. This practise showcases how you would add a dependency to your project.
- run `npm install bootstrap`
- Add Bootstrap to the project by importing bootstrap in the styles.css file

**src/styles.css**
```css
@import "~bootstrap/dist/css/bootstrap.min.css";
```
