"""Fraud case database management using SQLite."""
import sqlite3
import logging
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, Any

logger = logging.getLogger("fraud_database")

DB_PATH = Path(__file__).parent.parent / "fraud_cases.db"


def init_database():
    """Initialize the fraud cases database with sample data."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create fraud_cases table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS fraud_cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT NOT NULL,
            securityIdentifier TEXT NOT NULL,
            cardEnding TEXT NOT NULL,
            status TEXT DEFAULT 'pending_review',
            transactionName TEXT NOT NULL,
            transactionAmount REAL NOT NULL,
            transactionTime TEXT NOT NULL,
            transactionCategory TEXT NOT NULL,
            transactionSource TEXT NOT NULL,
            transactionLocation TEXT NOT NULL,
            securityQuestion TEXT NOT NULL,
            securityAnswer TEXT NOT NULL,
            outcomeNote TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Check if we already have sample data
    cursor.execute("SELECT COUNT(*) FROM fraud_cases")
    count = cursor.fetchone()[0]
    
    if count == 0:
        # Insert sample fraud cases
        sample_cases = [
            (
                "John Smith",
                "12345",
                "4242",
                "pending_review",
                "ABC Industry Ltd",
                2499.99,
                "2025-11-27 02:34:15",
                "e-commerce",
                "alibaba.com",
                "Shanghai, China",
                "What is your mother's maiden name?",
                "Johnson"
            ),
            (
                "Sarah Williams",
                "67890",
                "8765",
                "pending_review",
                "Luxury Watches International",
                8750.00,
                "2025-11-27 03:12:45",
                "retail",
                "luxurywatches-intl.ru",
                "Moscow, Russia",
                "What city were you born in?",
                "Boston"
            ),
            (
                "Michael Chen",
                "54321",
                "1111",
                "pending_review",
                "Crypto Exchange Pro",
                15000.00,
                "2025-11-26 23:45:30",
                "cryptocurrency",
                "cryptoexchange-pro.io",
                "Lagos, Nigeria",
                "What is your favorite color?",
                "Blue"
            ),
            (
                "Emily Rodriguez",
                "98765",
                "3333",
                "pending_review",
                "Electronics Mega Store",
                3299.50,
                "2025-11-27 01:20:10",
                "electronics",
                "electronics-mega.cn",
                "Shenzhen, China",
                "What is your pet's name?",
                "Max"
            ),
            (
                "David Thompson",
                "11111",
                "7777",
                "pending_review",
                "Premium Gaming Services",
                599.99,
                "2025-11-27 04:05:22",
                "gaming",
                "premium-gaming.xyz",
                "Unknown Location",
                "What is your favorite food?",
                "Pizza"
            )
        ]
        
        cursor.executemany("""
            INSERT INTO fraud_cases (
                userName, securityIdentifier, cardEnding, status,
                transactionName, transactionAmount, transactionTime,
                transactionCategory, transactionSource, transactionLocation,
                securityQuestion, securityAnswer
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, sample_cases)
        
        conn.commit()
        logger.info(f"✅ Initialized database with {len(sample_cases)} sample fraud cases")
    else:
        logger.info(f"📊 Database already contains {count} fraud cases")
    
    conn.close()


def get_fraud_case_by_username(username: str) -> Optional[Dict[str, Any]]:
    """Retrieve a pending fraud case by username."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT * FROM fraud_cases 
        WHERE LOWER(userName) = LOWER(?) 
        AND status = 'pending_review'
        ORDER BY createdAt DESC
        LIMIT 1
    """, (username,))
    
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return dict(row)
    return None


def update_fraud_case_status(case_id: int, status: str, outcome_note: str):
    """Update the status of a fraud case."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE fraud_cases 
        SET status = ?, 
            outcomeNote = ?,
            updatedAt = ?
        WHERE id = ?
    """, (status, outcome_note, datetime.now().isoformat(), case_id))
    
    conn.commit()
    affected = cursor.rowcount
    conn.close()
    
    logger.info(f"✅ Updated fraud case {case_id} to status: {status}")
    return affected > 0


def get_all_fraud_cases():
    """Retrieve all fraud cases for debugging."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM fraud_cases ORDER BY createdAt DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]


# Initialize database on module import
init_database()
