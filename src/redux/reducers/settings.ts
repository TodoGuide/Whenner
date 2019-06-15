import { defaultSettings, Settings } from "../../models/Settings";
import { WhennerAction } from "../actions/WhennerAction";

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  return state;
}
