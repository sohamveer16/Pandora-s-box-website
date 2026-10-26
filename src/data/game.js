/**
 * Game Metadata & Placeholder Configuration
 * 
 * Cleanly decoupled to easily connect with a Java Spring Boot REST backend:
 * e.g., GET /api/v1/game/info
 */

export const gameInfo = {
  title: "PANDORA'S BOX",
  genre: "2D Fantasy Action-Adventure",
  tagline: "Uncover the Ancient Secret That Should Have Remained Sealed",
  overview: "Pandora's Box is a 2D fantasy action-adventure game rendered in rich, evocative pixel-art. Players embark on a perilous journey across forgotten crypts, enchanted ruins, and shadowed woodlands to confront the consequences of the mythical box's unsealing.",
  descriptionPlaceholder: "[GAME DESCRIPTION]",
  overviewPlaceholder: "[GAME OVERVIEW]",
  gameplayPlaceholder: "[GAMEPLAY INFORMATION]",
  storyHookPlaceholder: "[STORY HOOK]",
  primaryCtaText: "PRE-REGISTER",
  secondaryCtaText: "EXPLORE THE REALM",
  platforms: [
    { id: "pc", name: "PC (Steam / Epic)", icon: "terminal", available: true },
    { id: "console", name: "Console Edition", icon: "gamepad-2", available: true },
    { id: "other", name: "Other Platforms", icon: "sparkles", available: true }
  ],
  featuresSummary: [
    {
      id: "atmospheric-world",
      title: "ATMOSPHERIC PIXEL WORLD",
      subtitle: "[ENVIRONMENT HIGHLIGHT]",
      description: "[GAMEPLAY INFORMATION - Handcrafted environments, dynamic lightning, weather, and layered depth.]"
    },
    {
      id: "tactical-combat",
      title: "PRECISION ACTION COMBAT",
      subtitle: "[COMBAT SYSTEM]",
      description: "[GAMEPLAY INFORMATION - Responsive blade combat, spellcasting, dodge mechanics, and boss encounters.]"
    },
    {
      id: "ancient-mysteries",
      title: "THE ENIGMA OF THE BOX",
      subtitle: "[LORE & PUZZLES]",
      description: "[GAMEPLAY INFORMATION - Cryptic runes, hidden tombs, and escalating mythical power choices.]"
    }
  ],
  footerLinks: [
    { label: "Home", href: "#home" },
    { label: "Game", href: "#game" },
    { label: "Story", href: "#story" },
    { label: "Character", href: "#character" },
    { label: "Pre-Register", href: "#pre-register" }
  ]
};
