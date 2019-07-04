import { Settings } from "../../models/Settings";
import { WhennerAction } from "../actions/WhennerAction";
import { defaultSettings } from "../../services/SettingsService";

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  // console.log("settings reducer", state, action);
  return state;
}
