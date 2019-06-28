import {
  createStore,
  Store as ReduxStore,
  applyMiddleware,
  compose
} from "redux";
import { State, initialState } from "./State";
import { WhennerAction } from "./actions/WhennerAction";
import { whenner } from "./reducers/whenner";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

interface StoreContainer {
  getInstance: () => ReduxStore<State, WhennerAction>;
}

export class Store {
  private static defaultContainer = Store.newContainer();

  public static get instance() {
    return Store.getInstance(Store.defaultContainer);
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
      whenner,
      initialState,
      composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );

    return {
      getInstance: () => instance
    };
  }
}
