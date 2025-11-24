#!/usr/bin/env python3
"""
Quick test script to verify Notion API access.
Run this to check if your Notion integration is properly configured.
"""

import os
import httpx
from dotenv import load_dotenv

load_dotenv(".env")

NOTION_API_KEY = os.getenv("NOTION_API_KEY")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
NOTION_TODO_PAGE_ID = os.getenv("NOTION_TODO_PAGE_ID")

def test_notion_connection():
    """Test Notion API connection and permissions."""
    
    print("🔍 Testing Notion Integration...\n")
    
    # Check environment variables
    print("1. Checking environment variables...")
    if not NOTION_API_KEY:
        print("   ❌ NOTION_API_KEY not found in .env")
        return False
    print(f"   ✅ NOTION_API_KEY: {NOTION_API_KEY[:20]}...")
    
    if not NOTION_DATABASE_ID:
        print("   ❌ NOTION_DATABASE_ID not found in .env")
        return False
    print(f"   ✅ NOTION_DATABASE_ID: {NOTION_DATABASE_ID}")
    
    if not NOTION_TODO_PAGE_ID:
        print("   ⚠️  NOTION_TODO_PAGE_ID not found (optional)")
    else:
        print(f"   ✅ NOTION_TODO_PAGE_ID: {NOTION_TODO_PAGE_ID}")
    
    headers = {
        "Authorization": f"Bearer {NOTION_API_KEY}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }
    
    # Test 1: Retrieve database
    print("\n2. Testing database access...")
    try:
        response = httpx.get(
            f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}",
            headers=headers,
            timeout=10.0
        )
        
        if response.status_code == 200:
            db_data = response.json()
            title_list = db_data.get('title', [])
            db_name = title_list[0].get('plain_text', 'Unnamed') if title_list else 'Unnamed'
            print(f"   ✅ Database accessible: {db_name}")
        elif response.status_code == 404:
            print("   ❌ Database not found (404)")
            print("   → Make sure the database is shared with your integration")
            return False
        elif response.status_code == 401:
            print("   ❌ Unauthorized (401)")
            print("   → Check your NOTION_API_KEY")
            return False
        else:
            print(f"   ❌ Error {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Connection error: {e}")
        return False
    
    # Test 2: Query database
    print("\n3. Testing database query...")
    try:
        response = httpx.post(
            f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query",
            headers=headers,
            json={"page_size": 5},
            timeout=10.0
        )
        
        if response.status_code == 200:
            results = response.json().get("results", [])
            print(f"   ✅ Query successful: Found {len(results)} tasks")
            
            if results:
                print("\n   Recent tasks:")
                for page in results[:3]:
                    try:
                        props = page.get("properties", {})
                        name_prop = props.get("Name", {})
                        title = name_prop.get("title", [])
                        task_name = title[0].get("text", {}).get("content", "Untitled") if title else "Untitled"
                        
                        status_prop = props.get("Status", {})
                        status = status_prop.get("select", {}).get("name", "Unknown") if status_prop.get("select") else "Unknown"
                        
                        print(f"   • {task_name} [{status}]")
                    except Exception as e:
                        print(f"   ⚠️  Error parsing task: {e}")
        else:
            print(f"   ❌ Query failed: {response.status_code}")
            print(f"   {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Query error: {e}")
        return False
    
    # Test 3: Test To Do List page (if configured)
    if NOTION_TODO_PAGE_ID:
        print("\n4. Testing To Do List page access...")
        try:
            response = httpx.get(
                f"https://api.notion.com/v1/blocks/{NOTION_TODO_PAGE_ID}/children",
                headers=headers,
                timeout=10.0
            )
            
            if response.status_code == 200:
                blocks = response.json().get("results", [])
                todo_blocks = [b for b in blocks if b.get("type") == "to_do"]
                print(f"   ✅ To Do List accessible: Found {len(todo_blocks)} to-do items")
            elif response.status_code == 404:
                print("   ❌ To Do List page not found (404)")
                print("   → Make sure the page is shared with your integration")
            else:
                print(f"   ⚠️  To Do List access issue: {response.status_code}")
        except Exception as e:
            print(f"   ⚠️  To Do List error: {e}")
    
    print("\n✅ All tests passed! Notion integration is working correctly.\n")
    return True


if __name__ == "__main__":
    success = test_notion_connection()
    
    if not success:
        print("\n❌ Notion integration test failed!")
        print("\n📝 Troubleshooting steps:")
        print("1. Go to https://www.notion.so/my-integrations")
        print("2. Find your integration and copy the API key")
        print("3. Make sure your database is shared with the integration:")
        print("   • Open your Wellness database in Notion")
        print("   • Click '...' menu → 'Add connections'")
        print("   • Select your integration")
        print("4. Update NOTION_API_KEY and NOTION_DATABASE_ID in .env")
        print("5. Run this test again\n")
        exit(1)
    
    exit(0)
