"""Game state management for the D&D-style voice agent."""

import json
import random
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any, List


class GameState:
    """Manages the JSON world state for the game."""
    
    def __init__(self, universe: str = "fantasy"):
        self.universe = universe
        self.character: Optional[Dict[str, Any]] = None
        self.world: Dict[str, Any] = {
            "current_location": None,
            "locations_visited": [],
            "events": [],
            "quests": [],
            "npcs_met": []
        }
        self.session_start = datetime.now().isoformat()
        
    def create_character(self, name: str, character_class: str) -> Dict[str, Any]:
        """Create a new player character with random stats."""
        self.character = {
            "name": name,
            "class": character_class,
            "hp": 100,
            "max_hp": 100,
            "status": "Healthy",
            "stats": {
                "strength": random.randint(10, 20),
                "intelligence": random.randint(10, 20),
                "luck": random.randint(10, 20)
            },
            "inventory": [],
            "gold": 50
        }
        return self.character
    
    def update_hp(self, amount: int, reason: str) -> Dict[str, Any]:
        """Update character HP and status."""
        if not self.character:
            return {"error": "No character created"}
        
        self.character["hp"] = max(0, min(self.character["max_hp"], self.character["hp"] + amount))
        
        # Update status based on HP
        hp_percent = (self.character["hp"] / self.character["max_hp"]) * 100
        if hp_percent == 0:
            self.character["status"] = "Dead"
        elif hp_percent < 25:
            self.character["status"] = "Critical"
        elif hp_percent < 50:
            self.character["status"] = "Injured"
        else:
            self.character["status"] = "Healthy"
        
        # Record event
        self.add_event(f"{self.character['name']} {reason} ({amount:+d} HP, now at {self.character['hp']}/{self.character['max_hp']})")
        
        return {
            "hp": self.character["hp"],
            "max_hp": self.character["max_hp"],
            "status": self.character["status"],
            "change": amount
        }
    
    def add_to_inventory(self, item: str, description: str = "") -> bool:
        """Add an item to character inventory."""
        if not self.character:
            return False
        
        self.character["inventory"].append({
            "name": item,
            "description": description,
            "acquired": datetime.now().isoformat()
        })
        
        self.add_event(f"{self.character['name']} acquired: {item}")
        return True
    
    def remove_from_inventory(self, item: str) -> bool:
        """Remove an item from character inventory."""
        if not self.character:
            return False
        
        # Find and remove item (case-insensitive)
        for i, inv_item in enumerate(self.character["inventory"]):
            if inv_item["name"].lower() == item.lower():
                removed = self.character["inventory"].pop(i)
                self.add_event(f"{self.character['name']} used/lost: {removed['name']}")
                return True
        
        return False
    
    def update_location(self, location_name: str, description: str = "") -> Dict[str, Any]:
        """Update current location and track visited locations."""
        self.world["current_location"] = {
            "name": location_name,
            "description": description,
            "visited_at": datetime.now().isoformat()
        }
        
        if location_name not in self.world["locations_visited"]:
            self.world["locations_visited"].append(location_name)
        
        self.add_event(f"Arrived at {location_name}")
        
        return self.world["current_location"]
    
    def add_event(self, event_description: str) -> None:
        """Record an important story event."""
        self.world["events"].append({
            "description": event_description,
            "timestamp": datetime.now().isoformat()
        })
    
    def add_quest(self, quest_name: str, description: str, status: str = "active") -> Dict[str, Any]:
        """Add or update a quest."""
        # Check if quest already exists
        for quest in self.world["quests"]:
            if quest["name"] == quest_name:
                quest["status"] = status
                quest["updated_at"] = datetime.now().isoformat()
                return quest
        
        # Create new quest
        new_quest = {
            "name": quest_name,
            "description": description,
            "status": status,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        self.world["quests"].append(new_quest)
        self.add_event(f"Quest {'completed' if status == 'completed' else 'accepted'}: {quest_name}")
        
        return new_quest
    
    def add_npc(self, npc_name: str, role: str, attitude: str = "neutral") -> Dict[str, Any]:
        """Add an NPC to the world."""
        npc = {
            "name": npc_name,
            "role": role,
            "attitude": attitude,
            "met_at": datetime.now().isoformat()
        }
        self.world["npcs_met"].append(npc)
        self.add_event(f"Met {npc_name} ({role})")
        return npc
    
    def roll_dice(self, sides: int = 20) -> int:
        """Roll a dice with specified sides."""
        return random.randint(1, sides)
    
    def perform_skill_check(self, action: str, stat_type: str) -> Dict[str, Any]:
        """Perform a skill check with d20 + stat modifier."""
        if not self.character:
            return {"error": "No character created"}
        
        stat_type = stat_type.lower()
        if stat_type not in self.character["stats"]:
            stat_type = "luck"  # Default to luck if invalid stat
        
        roll = self.roll_dice(20)
        stat_value = self.character["stats"][stat_type]
        total = roll + stat_value
        
        # Determine outcome
        if total < 10:
            outcome = "failure"
            description = "Failed"
        elif total < 20:
            outcome = "partial"
            description = "Partial Success"
        else:
            outcome = "success"
            description = "Full Success"
        
        result = {
            "action": action,
            "stat_used": stat_type,
            "roll": roll,
            "stat_value": stat_value,
            "total": total,
            "outcome": outcome,
            "description": description
        }
        
        self.add_event(f"Skill check for '{action}': rolled {roll} + {stat_type} {stat_value} = {total} ({description})")
        
        return result
    
    def get_state_summary(self) -> str:
        """Get a human-readable summary of the current game state."""
        if not self.character:
            return "No character created yet."
        
        summary = f"""
=== CHARACTER ===
Name: {self.character['name']} ({self.character['class']})
HP: {self.character['hp']}/{self.character['max_hp']} ({self.character['status']})
Stats: STR {self.character['stats']['strength']}, INT {self.character['stats']['intelligence']}, LUCK {self.character['stats']['luck']}
Gold: {self.character['gold']}
Inventory: {', '.join([item['name'] for item in self.character['inventory']]) if self.character['inventory'] else 'Empty'}

=== WORLD ===
Current Location: {self.world['current_location']['name'] if self.world['current_location'] else 'Unknown'}
Locations Visited: {', '.join(self.world['locations_visited']) if self.world['locations_visited'] else 'None'}
Active Quests: {len([q for q in self.world['quests'] if q['status'] == 'active'])}
Events Recorded: {len(self.world['events'])}
"""
        return summary.strip()
    
    def to_dict(self) -> Dict[str, Any]:
        """Export full game state as dictionary."""
        return {
            "session_start": self.session_start,
            "universe": self.universe,
            "character": self.character,
            "world": self.world,
            "exported_at": datetime.now().isoformat()
        }
    
    def from_dict(self, data: Dict[str, Any]) -> None:
        """Import game state from dictionary."""
        self.session_start = data.get("session_start", datetime.now().isoformat())
        self.universe = data.get("universe", "fantasy")
        self.character = data.get("character")
        self.world = data.get("world", {
            "current_location": None,
            "locations_visited": [],
            "events": [],
            "quests": [],
            "npcs_met": []
        })
    
    def save_to_file(self, directory: Path) -> str:
        """Save game state to JSON file."""
        directory.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        char_name = self.character["name"].replace(" ", "_") if self.character else "unknown"
        filename = f"game_{char_name}_{timestamp}.json"
        filepath = directory / filename
        
        with open(filepath, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
        
        return str(filepath)
    
    def load_from_file(self, filepath: Path) -> bool:
        """Load game state from JSON file."""
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            self.from_dict(data)
            return True
        except Exception as e:
            print(f"Error loading game: {e}")
            return False
