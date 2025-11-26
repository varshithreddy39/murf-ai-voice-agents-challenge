#!/usr/bin/env python3
"""Test script to verify lead saving functionality"""

import json
from pathlib import Path
from datetime import datetime

LEAD_DATA_FILE = Path(__file__).parent / "lead_data.json"

def test_lead_save():
    print("🧪 Testing lead save functionality...")
    print(f"📁 File location: {LEAD_DATA_FILE}")
    
    # Create test lead data
    test_lead = {
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Company",
        "team_size": "50",
        "current_crm": "None",
        "pain_points": "Lead tracking",
        "timestamp": datetime.now().isoformat(),
        "room_id": "test_room"
    }
    
    # Load existing data
    if LEAD_DATA_FILE.exists():
        with open(LEAD_DATA_FILE, "r") as f:
            data = json.load(f)
        print(f"✅ Loaded existing data with {len(data.get('leads', []))} leads")
    else:
        data = {"leads": [], "lastUpdated": None}
        print("📝 Creating new data structure")
    
    # Add test lead
    data["leads"].append(test_lead)
    data["lastUpdated"] = test_lead["timestamp"]
    
    # Save
    with open(LEAD_DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
    
    print(f"✅ Successfully saved test lead!")
    print(f"📊 Total leads now: {len(data['leads'])}")
    print(f"\n📋 Latest lead:")
    print(json.dumps(test_lead, indent=2))
    
    # Verify
    with open(LEAD_DATA_FILE, "r") as f:
        verify_data = json.load(f)
    
    if len(verify_data["leads"]) == len(data["leads"]):
        print("\n✅ Verification successful! Lead was saved correctly.")
    else:
        print("\n❌ Verification failed! Data mismatch.")

if __name__ == "__main__":
    test_lead_save()
