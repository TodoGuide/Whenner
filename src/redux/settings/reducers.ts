import { Settings } from "../../models/Settings";
import { defaultSettings } from "../../services/SettingsService";
import { WhennerAction } from "..";

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  // console.log("settings reducer", state, action);
  return state;
}
