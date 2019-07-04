import { defaultChronotype } from "../models/Chronotype";
import { Settings } from "../models/Settings";

export const SETTINGS_KEY = "Whenner.Settings";

export const defaultSettings: Settings = {
  chronotype: defaultChronotype
}

async function readSettings(): Promise<Settings> {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null") || defaultSettings;
}

async function writeSettings(settings: Settings): Promise<Settings> {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  return settings;
}

export class SettingsService {
  async save(settings: Settings): Promise<Settings> {
    return await writeSettings(settings);
  }

  async settings() {
    return await readSettings();
  }
}