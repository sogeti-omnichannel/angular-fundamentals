# Sogeti Angular course - Routing

## Adding routing to the app
**match-routing.module.ts**
With routing we can route specific urls to components. If you navigate to for example `http://localhost:4200/match/add` the MatchAddComponent will be displayed within the app.component.html file replacing the `<router-outlet></router-outlet>` element.

```typescript
  { path: 'match/add', component: MatchAddComponent },
  { path: 'match/list', component: MatchListComponent },
```

Autoimport `MatchAddComponent` and `MatchListComponent`.

**player-routing.module.ts**
Repeat the same for the Player module.

```typescript
{ path: 'player/rank', component: PlayerRankComponent }
```

Autoimport `PlayerRankComponent`.

**app-routing.module.ts** 
```typescript
{ path: '', redirectTo: '/match/list', pathMatch: 'full' },
```

We will have to add a `router-outlet` to the main app component. This is the place where your routed components will show up.
**app.component.html**
```html
<div class="container">
  <router-outlet></router-outlet>
</div>
```

Add a Bootstrap menu to the app component. See how the links are using the routerLink directive to route to the components.
**app.component.html**
```html
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid"><a class="navbar-brand" href="#">Tournament app</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/match/list">Matches</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/player/rank">Rank</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container">
  <router-outlet></router-outlet>
</div>
```