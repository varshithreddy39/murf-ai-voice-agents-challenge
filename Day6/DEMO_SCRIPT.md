# 🎬 Day 6 - Fraud Alert Agent Demo Script

## 🎯 Quick Demo (2 minutes)

### **Setup:**
1. Open http://localhost:3000
2. Have `view_cases.py` ready to run
3. Have `resolved_cases/` folder open

---

## 📋 **Conversation Script**

### **Scenario 1: Raju - International Wire Transfer (BEST FOR DEMO)**

**👤 YOU:** *(Click "Connect to Fraud Department")*

**🤖 AGENT:** 
> "Hello, this is the SecureBank Fraud Prevention Department. May I please have your name to pull up your account?"

**👤 YOU:** 
> **"Raju"**

**🤖 AGENT:** 
> "Thank you, Raju. I've pulled up your account. I can see we have a fraud alert on your card ending in 5678. Before we proceed, I need to verify your identity. What city are you from?"

**👤 YOU:** 
> **"Nellore"**

**🤖 AGENT:** 
> "Perfect, thank you. Now, regarding the suspicious transaction: We detected a charge of $25,000.00 to International Wire Transfer from unknown-sender.com in Dubai, UAE on November 27th at 5:30 AM. Did you authorize this transaction?"

**👤 YOU:** 
> **"No"** *(or "No, I didn't make that transaction")*

**🤖 AGENT:** 
> "I understand, Raju. I've immediately blocked your card ending in 5678 to prevent any further unauthorized charges. You will NOT be charged for this $25,000.00 transaction. We'll mail you a replacement card within 3 to 5 business days to your address on file. You'll also receive an email with dispute details and next steps. Is there anything else I can help you with today? Thank you for banking with SecureBank. Have a great day!"

**👤 YOU:** 
> **"No, thank you"**

---

### **Scenario 2: Sarah Williams - Luxury Watch Fraud**

**👤 YOU:** *(Click "Connect to Fraud Department")*

**🤖 AGENT:** 
> "Hello, this is the SecureBank Fraud Prevention Department. May I please have your name to pull up your account?"

**👤 YOU:** 
> **"Sarah Williams"**

**🤖 AGENT:** 
> "Thank you, Sarah Williams. I've pulled up your account. I can see we have a fraud alert on your card ending in 8765. Before we proceed, I need to verify your identity. What city were you born in?"

**👤 YOU:** 
> **"Boston"**

**🤖 AGENT:** 
> "Perfect, thank you. Now, regarding the suspicious transaction: We detected a charge of $8,750.00 to Luxury Watches International from luxurywatches-intl.ru in Moscow, Russia on November 27th at 3:12 AM. Did you authorize this transaction?"

**👤 YOU:** 
> **"No"** *(or "No, I didn't make that purchase")*

**🤖 AGENT:** 
> "I understand, Sarah Williams. I've immediately blocked your card ending in 8765 to prevent any further unauthorized charges. You will NOT be charged for this $8,750.00 transaction. We'll mail you a replacement card within 3 to 5 business days to your address on file. You'll also receive an email with dispute details and next steps. Is there anything else I can help you with today? Thank you for banking with SecureBank. Have a great day!"

**👤 YOU:** 
> **"No, thank you"**

---

## 🎥 **What to Show in Video:**

### **Before Conversation:**
```bash
cd Day6/backend
uv run python view_cases.py
```
Show: All cases are "⏳ Pending Review"

### **During Conversation:**
- Show the voice interface
- Speak clearly into microphone
- Show agent responding

### **After Conversation:**
```bash
# Show updated database
uv run python view_cases.py
```
Show: Sarah Williams case is now "🚨 Confirmed Fraud"

```bash
# Show JSON file
ls -la resolved_cases/
cat resolved_cases/case_2_Sarah_Williams_*.json
```
Show: JSON file with all transaction details

---

## 🎬 **Alternative Scenarios**

### **Scenario 3: Mark as SAFE**

**Customer:** John Smith  
**Security Answer:** Johnson  
**Transaction:** $2,499.99 to ABC Industry  
**Your Response:** **"Yes"** *(to mark as safe)*

### **Scenario 4: High-Value Crypto Fraud**

**Customer:** Michael Chen  
**Security Answer:** Blue  
**Transaction:** $15,000.00 to Crypto Exchange  
**Your Response:** **"No"** *(to mark as fraud)*

---

## 📊 **Demo Flow Summary**

1. **Show UI** - Clean fraud alert page
2. **Click Connect** - Start voice call
3. **Say Name** - "Sarah Williams"
4. **Answer Security** - "Boston"
5. **Deny Transaction** - "No"
6. **Show Database** - Status changed to fraud
7. **Show JSON** - Resolved case file created

---

## 💡 **Pro Tips for Video:**

- ✅ Speak clearly and at normal pace
- ✅ Wait for agent to finish before responding
- ✅ Show terminal logs in background
- ✅ Highlight the status change in database
- ✅ Show the JSON file content
- ✅ Keep it under 3 minutes

---

## 🎤 **Quick Reference Card**

| Customer | Security Answer | Amount | Say "No" for Fraud |
|----------|----------------|--------|-------------------|
| **Raju** | **Nellore** | **$25,000** | ✅ **BEST - Wire Transfer** |
| Sarah Williams | Boston | $8,750 | ✅ Luxury Watch |
| Michael Chen | Blue | $15,000 | ✅ Crypto |
| John Smith | Johnson | $2,499 | ✅ E-commerce |
| Emily Rodriguez | Max | $3,299 | ✅ Electronics |
| David Thompson | Pizza | $599 | ✅ Gaming |

---

## 🚀 **One-Line Commands**

```bash
# View all cases
uv run python view_cases.py

# View JSON files
ls -la resolved_cases/ && cat resolved_cases/*.json

# Reset all cases (for retakes)
python reset_cases.py
```

---

**Perfect for a 2-3 minute demo video!** 🎯
