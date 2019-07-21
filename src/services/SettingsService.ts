import { defaultChronotype } from "../models/Chronotype";
import { Settings } from "../models/Settings";
import { LocalStorageService } from "./LocalStorageService";

export const SETTINGS_KEY = "Whenner.Settings";

export const defaultSettings: Settings = {
  chronotype: defaultChronotype
}
export class SettingsService extends LocalStorageService<Settings> {

  constructor(){
    super(SETTINGS_KEY, defaultSettings);
  }

  async save(settings: Settings): Promise<Settings> {
    return await this.write(settings);
  }

  async settings() {
    return await this.read();
  }
}