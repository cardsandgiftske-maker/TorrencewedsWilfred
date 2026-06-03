/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVP {
  id: string;
  name: string;
  email?: string;
  attending: boolean;
  guestsCount: number;
  dietary?: string;
  wishes?: string;
  timestamp: string;
}

export interface WeddingDetails {
  bride: string;
  groom: string;
  date: string;
  time: string;
  location: string;
  locationDetails: string;
  dressCode: string;
  themeColors: {
    sage: string;
    ivory: string;
    gold: string;
  };
  giftGuidelines: string;
}

export const DETAILS: WeddingDetails = {
  bride: "Torrence",
  groom: "Wilfred",
  date: "2026-09-26T11:00:00", // September 26, 2026 at 11:00 AM
  time: "11:00 A.M",
  location: "Naiposha Gardens, Tigoni",
  locationDetails: "Nestled in the beautiful, serene, lush green tea fields of Tigoni, Naiposha Gardens offers a spectacular lakeside view, cool highlands climate, and mesmerizing scenery. We recommend leaving early and bringing a warm shawl or coat for the late afternoon breeze.",
  dressCode: "Elegant Semi-Formal. We warmly invite you to celebrate in polished yet relaxed attire. Choose colors and styles that make you feel your best.",
  themeColors: {
    sage: "#8F9779",
    ivory: "#FAF9F6",
    gold: "#D4AF37"
  },
  giftGuidelines: "Enveloped and electronic transfer are preferred."
};
