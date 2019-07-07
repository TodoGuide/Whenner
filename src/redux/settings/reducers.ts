import { Settings } from "../../models/Settings";
import { defaultSettings } from "../../services/SettingsService";
import { WhennerAction } from "../common/actions";

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  // console.log("settings reducer", state, action);
  return state;
}
