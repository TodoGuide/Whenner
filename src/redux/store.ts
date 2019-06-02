import { createStore, Store } from "redux";
import { whennerApp, WhennerState } from "./state";
import { WhennerAction } from "./actions";

export interface WhennerStoreContainer {
  getInstance: () => Store<WhennerState, WhennerAction>;
}

export class WhennerStore {
  private static defaultContainer = WhennerStore.newContainer();

  public static get instance() {
    return WhennerStore.getInstance(WhennerStore.defaultContainer);
  }

  public static getInstance(
    container: WhennerStoreContainer = WhennerStore.defaultContainer
  ) {
    return container.getInstance();
  }

  public static newContainer(): WhennerStoreContainer {
    const instance = createStore(whennerApp);
    return {
      getInstance: () => instance
    };
  }
}
