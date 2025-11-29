"""View saved game files."""

import json
from pathlib import Path
from datetime import datetime

def view_saved_games():
    """Display all saved games."""
    save_dir = Path(__file__).parent / "saved_games"
    
    if not save_dir.exists():
        print("❌ No saved_games directory found")
        return
    
    save_files = list(save_dir.glob("game_*.json"))
    
    if not save_files:
        print("📁 No saved games found")
        return
    
    print(f"🎲 Found {len(save_files)} saved game(s)\n")
    print("=" * 80)
    
    for filepath in sorted(save_files, key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            char = data.get('character', {})
            world = data.get('world', {})
            
            print(f"\n📄 {filepath.name}")
            print(f"   Saved: {data.get('exported_at', 'Unknown')}")
            print(f"   Universe: {data.get('universe', 'Unknown')}")
            
            if char:
                print(f"\n   👤 Character:")
                print(f"      Name: {char.get('name')} ({char.get('class')})")
                print(f"      HP: {char.get('hp')}/{char.get('max_hp')} ({char.get('status')})")
                print(f"      Stats: STR {char.get('stats', {}).get('strength')}, "
                      f"INT {char.get('stats', {}).get('intelligence')}, "
                      f"LUCK {char.get('stats', {}).get('luck')}")
                print(f"      Gold: {char.get('gold')}")
                print(f"      Inventory: {len(char.get('inventory', []))} items")
            
            if world:
                current_loc = world.get('current_location')
                if current_loc:
                    print(f"\n   📍 Location: {current_loc.get('name')}")
                
                quests = world.get('quests', [])
                active_quests = [q for q in quests if q.get('status') == 'active']
                if active_quests:
                    print(f"   📜 Active Quests: {len(active_quests)}")
                    for quest in active_quests:
                        print(f"      • {quest.get('name')}")
                
                events = world.get('events', [])
                if events:
                    print(f"   📝 Events: {len(events)} recorded")
            
            print("\n" + "-" * 80)
            
        except Exception as e:
            print(f"❌ Error reading {filepath.name}: {e}")
    
    print("\n✅ Done")

if __name__ == "__main__":
    view_saved_games()
