from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os
from datetime import datetime
import uuid
from typing import Optional

# Initialize FastAPI app
app = FastAPI(title="DigitalMax Pro API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client.digitalmaxpro

# Collections
contacts_collection = db.contacts

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    service: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    service: Optional[str]
    message: str
    created_at: datetime
    status: str = "new"

# Routes
@app.get("/")
async def root():
    return {"message": "DigitalMax Pro API is running", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    try:
        # Test MongoDB connection
        client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

@app.post("/api/contact", response_model=dict)
async def submit_contact_form(contact: ContactForm):
    try:
        # Create contact document
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "service": contact.service,
            "message": contact.message,
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Insert into MongoDB
        result = contacts_collection.insert_one(contact_doc)
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Contact form submitted successfully",
                "contact_id": contact_doc["id"]
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact form")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing contact form: {str(e)}")

@app.get("/api/contacts")
async def get_all_contacts():
    try:
        contacts = list(contacts_collection.find({}, {"_id": 0}).sort("created_at", -1))
        return {
            "success": True,
            "count": len(contacts),
            "contacts": contacts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contacts: {str(e)}")

@app.get("/api/contacts/{contact_id}")
async def get_contact_by_id(contact_id: str):
    try:
        contact = contacts_collection.find_one({"id": contact_id}, {"_id": 0})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {
            "success": True,
            "contact": contact
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact: {str(e)}")

@app.put("/api/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    try:
        valid_statuses = ["new", "contacted", "qualified", "closed"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = contacts_collection.update_one(
            {"id": contact_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {
            "success": True,
            "message": f"Contact status updated to {status}"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating contact status: {str(e)}")

@app.delete("/api/contacts/{contact_id}")
async def delete_contact(contact_id: str):
    try:
        result = contacts_collection.delete_one({"id": contact_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {
            "success": True,
            "message": "Contact deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting contact: {str(e)}")

# Statistics endpoint
@app.get("/api/stats")
async def get_stats():
    try:
        total_contacts = contacts_collection.count_documents({})
        new_contacts = contacts_collection.count_documents({"status": "new"})
        contacted = contacts_collection.count_documents({"status": "contacted"})
        qualified = contacts_collection.count_documents({"status": "qualified"})
        closed = contacts_collection.count_documents({"status": "closed"})
        
        # Get service breakdown
        pipeline = [
            {"$group": {"_id": "$service", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        service_stats = list(contacts_collection.aggregate(pipeline))
        
        return {
            "success": True,
            "stats": {
                "total_contacts": total_contacts,
                "new_contacts": new_contacts,
                "contacted": contacted,
                "qualified": qualified,
                "closed": closed,
                "service_breakdown": service_stats
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)