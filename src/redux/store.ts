import {
  createStore,
  Store as ReduxStore,
  applyMiddleware,
  compose
} from "redux";
import { reducer, WhennerAction, WhennerState, initialState } from ".";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

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

    const instance = createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );

    return {
      getInstance: () => instance
    };
  }
}

export const store = Store.instance;