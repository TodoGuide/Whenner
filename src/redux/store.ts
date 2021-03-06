// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import {
  createStore,
  Store as ReduxStore,
  applyMiddleware,
  compose
} from "redux";
import { reducer, WhennerState, initialState } from ".";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { WhennerAction } from "./common/actions";
import { logger, thunkCounter, reloadTasksOnUpsertSuccess } from "./middleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

type WhennerStore = ReduxStore<WhennerState, WhennerAction>;

interface StoreContainer {
  getInstance: () => WhennerStore;
}

export class Store {
  private static defaultContainer = Store.newContainer();

  public static get instance() {
    return Store.getInstance();
  }

  public static getInstance(
    container: StoreContainer = Store.defaultContainer
  ) {
    return container.getInstance();
  }

  public static newContainer(): StoreContainer {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // redux dev tools

    const instance: WhennerStore = createStore(
      reducer,
      initialState,
      composeEnhancers(
        applyMiddleware(
          // Count async load operations - must come before thunk
          thunkCounter,
          // Allow thunks as middleware. Because middleware is potentially asynchronous, this should
          // be the first store enhancer in the composition chain.
          thunk,
          // Log actions
          logger,
          //
          reloadTasksOnUpsertSuccess,
          // Die if state mutations are detected
          reduxImmutableStateInvariant()
        )
      )
    );

    return {
      getInstance: () => instance
    };
  }
}

export const store = Store.instance;
