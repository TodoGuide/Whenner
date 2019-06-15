import { createStore, Store as ReduxStore } from "redux";
import { State } from "./State";
import { WhennerAction } from "./actions/WhennerAction";
import { whenner } from "./reducers/whenner";

export interface StoreContainer {
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
    const instance = createStore(whenner);
    return {
      getInstance: () => instance
    };
  }
}
