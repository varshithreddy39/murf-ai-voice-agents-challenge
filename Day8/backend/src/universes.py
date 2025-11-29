"""Universe preset definitions for different game settings."""

UNIVERSES = {
    "fantasy": {
        "name": "Classic Fantasy - Eldoria",
        "setting": "the magical realm of Eldoria, a land of dragons, wizards, and ancient mysteries",
        "tone": "epic and dramatic, with a sense of wonder and danger",
        "character_classes": ["Warrior", "Mage", "Rogue", "Cleric", "Ranger"],
        "sample_locations": ["Millhaven Village", "Dark Forest", "Crystal Caves", "Dragon's Peak", "Ancient Ruins"],
        "sample_quests": [
            "Retrieve the stolen sacred crystal from goblin raiders",
            "Investigate mysterious disappearances in the village",
            "Defeat the dragon terrorizing the countryside",
            "Find the lost artifact in the ancient ruins"
        ],
        "opening": "Welcome, brave adventurer! You stand at the gates of Eldoria, a realm where magic flows through the very air and ancient dragons soar above misty mountains. The land is in turmoil, and heroes are needed. What is your name, traveler?"
    },
    
    "cyberpunk": {
        "name": "Cyberpunk - Neo-Tokyo 2099",
        "setting": "Neo-Tokyo 2099, a neon-lit megacity where corporations rule and hackers fight for freedom",
        "tone": "gritty and tech-noir, with moral ambiguity and high-tech danger",
        "character_classes": ["Netrunner", "Street Samurai", "Corporate Agent", "Tech Specialist", "Fixer"],
        "sample_locations": ["Neon District", "Corporate Tower", "Underground Market", "Data Haven", "Slums"],
        "sample_quests": [
            "Hack into the megacorp database to steal classified data",
            "Protect a whistleblower from corporate assassins",
            "Infiltrate a black market cybernetics lab",
            "Uncover the truth behind mysterious AI murders"
        ],
        "opening": "Welcome to Neo-Tokyo 2099, where the neon never sleeps and the corporations own everything. You're a runner in this chrome jungle, trying to survive another day. The rain falls on endless concrete as you stand in a dark alley, your neural implants humming. What do they call you on the streets?"
    },
    
    "space_opera": {
        "name": "Space Opera - Galactic Federation",
        "setting": "the Galactic Federation, spanning thousands of star systems with diverse alien civilizations",
        "tone": "adventurous and optimistic, with cosmic wonder and interstellar intrigue",
        "character_classes": ["Starship Captain", "Alien Diplomat", "Space Marine", "Xenobiologist", "Smuggler"],
        "sample_locations": ["Space Station Alpha", "Alien Homeworld", "Asteroid Belt", "Derelict Ship", "Trading Post"],
        "sample_quests": [
            "Negotiate peace between warring alien species",
            "Investigate a distress signal from an abandoned colony",
            "Smuggle vital supplies past a blockade",
            "Discover the secrets of an ancient alien artifact"
        ],
        "opening": "Greetings, spacefarer! You float in the observation deck of Space Station Alpha, gazing at the swirling nebula beyond. The Galactic Federation needs brave souls to explore the unknown reaches of space. Alien civilizations await contact, and ancient mysteries call from distant stars. What is your designation, traveler of the cosmos?"
    }
}


def get_universe(universe_key: str = "fantasy") -> dict:
    """Get universe configuration by key."""
    return UNIVERSES.get(universe_key, UNIVERSES["fantasy"])


def get_universe_list() -> list:
    """Get list of available universes."""
    return [
        {"key": key, "name": config["name"]}
        for key, config in UNIVERSES.items()
    ]
