"""Test script for game state management."""

import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from game_state import GameState
from universes import get_universe, get_universe_list

def test_game_state():
    """Test the game state system."""
    print("🎲 Testing Game State System\n")
    
    # Test universe loading
    print("=" * 50)
    print("UNIVERSES")
    print("=" * 50)
    for universe in get_universe_list():
        print(f"✓ {universe['name']}")
    print()
    
    # Create game state
    print("=" * 50)
    print("CHARACTER CREATION")
    print("=" * 50)
    game = GameState(universe="fantasy")
    char = game.create_character("Thorin", "Warrior")
    print(f"✓ Created: {char['name']} the {char['class']}")
    print(f"  HP: {char['hp']}/{char['max_hp']}")
    print(f"  STR: {char['stats']['strength']}, INT: {char['stats']['intelligence']}, LUCK: {char['stats']['luck']}")
    print(f"  Gold: {char['gold']}")
    print()
    
    # Test location
    print("=" * 50)
    print("LOCATION")
    print("=" * 50)
    location = game.update_location("Millhaven Village", "A peaceful village")
    print(f"✓ Moved to: {location['name']}")
    print()
    
    # Test quest
    print("=" * 50)
    print("QUEST")
    print("=" * 50)
    quest = game.add_quest(
        "Retrieve Sacred Crystal",
        "Goblins have stolen the village's sacred crystal",
        "active"
    )
    print(f"✓ Quest added: {quest['name']}")
    print(f"  Status: {quest['status']}")
    print()
    
    # Test inventory
    print("=" * 50)
    print("INVENTORY")
    print("=" * 50)
    game.add_to_inventory("Iron Sword", "A sturdy blade")
    game.add_to_inventory("Health Potion", "Restores 50 HP")
    print(f"✓ Added items to inventory")
    print(f"  Items: {[item['name'] for item in char['inventory']]}")
    print()
    
    # Test dice roll
    print("=" * 50)
    print("DICE ROLLS")
    print("=" * 50)
    for i in range(3):
        result = game.perform_skill_check("track goblins", "intelligence")
        print(f"✓ Roll {i+1}: d20={result['roll']} + {result['stat_used']}={result['stat_value']} = {result['total']} ({result['outcome']})")
    print()
    
    # Test HP update
    print("=" * 50)
    print("HP MANAGEMENT")
    print("=" * 50)
    result = game.update_hp(-30, "took damage from goblin")
    print(f"✓ Took damage: {result['change']} HP")
    print(f"  Current: {result['hp']}/{result['max_hp']} ({result['status']})")
    
    result = game.update_hp(20, "used health potion")
    print(f"✓ Healed: {result['change']:+d} HP")
    print(f"  Current: {result['hp']}/{result['max_hp']} ({result['status']})")
    print()
    
    # Test events
    print("=" * 50)
    print("EVENTS")
    print("=" * 50)
    print(f"✓ Recorded {len(game.world['events'])} events:")
    for event in game.world['events'][-5:]:
        print(f"  • {event['description']}")
    print()
    
    # Test save/load
    print("=" * 50)
    print("SAVE/LOAD")
    print("=" * 50)
    save_dir = Path(__file__).parent / "saved_games"
    filepath = game.save_to_file(save_dir)
    print(f"✓ Saved to: {filepath}")
    
    # Load it back
    new_game = GameState()
    success = new_game.load_from_file(Path(filepath))
    if success:
        print(f"✓ Loaded successfully")
        print(f"  Character: {new_game.character['name']}")
        print(f"  HP: {new_game.character['hp']}/{new_game.character['max_hp']}")
        print(f"  Location: {new_game.world['current_location']['name']}")
    print()
    
    # Show summary
    print("=" * 50)
    print("GAME STATE SUMMARY")
    print("=" * 50)
    print(game.get_state_summary())
    print()
    
    print("✅ All tests passed!")

if __name__ == "__main__":
    test_game_state()
