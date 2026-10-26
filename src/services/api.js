/**
 * API Service Layer
 * 
 * Provides clean asynchronous data fetching & form submissions.
 * Defaults to local mock responses with simulated latency, and can be
 * switched to a real Java / Spring Boot REST API by configuring VITE_API_BASE_URL.
 */

import { gameInfo } from '../data/game';
import { characterData } from '../data/character';
import { storyData } from '../data/story';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

export const apiService = {
  /**
   * Fetch game info
   */
  async getGameInfo() {
    if (BASE_URL) {
      const res = await fetch(`${BASE_URL}/game/info`);
      if (!res.ok) throw new Error("Failed to fetch game info");
      return res.json();
    }
    // Simulate slight network latency
    await new Promise((resolve) => setTimeout(resolve, 80));
    return gameInfo;
  },

  /**
   * Fetch character info
   */
  async getCharacterInfo() {
    if (BASE_URL) {
      const res = await fetch(`${BASE_URL}/characters/primary`);
      if (!res.ok) throw new Error("Failed to fetch character info");
      return res.json();
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
    return characterData;
  },

  /**
   * Fetch story lore chapters
   */
  async getStoryChapters() {
    if (BASE_URL) {
      const res = await fetch(`${BASE_URL}/lore/chapters`);
      if (!res.ok) throw new Error("Failed to fetch story chapters");
      return res.json();
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
    return storyData;
  },

  /**
   * Submit pre-registration
   * @param {{ email: string, platform: string }} payload
   */
  async submitPreRegistration(payload) {
    if (BASE_URL) {
      const res = await fetch(`${BASE_URL}/preregister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Pre-registration submission failed");
      return res.json();
    }

    // Realistic mock server response with simulated async network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic validation
    if (!payload.email || !payload.email.includes("@")) {
      return {
        success: false,
        message: "PLEASE ENTER A VALID RECIPIENT EMAIL SEAL."
      };
    }

    return {
      success: true,
      registrationId: `PANDORA-SEAL-${Math.floor(100000 + Math.random() * 900000)}`,
      platform: payload.platform,
      email: payload.email,
      timestamp: new Date().toISOString(),
      message: "YOUR SOUL SIGNATURE HAS BEEN RECORDED IN THE TOMES OF PANDORA."
    };
  }
};
