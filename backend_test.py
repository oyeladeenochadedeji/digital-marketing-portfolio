#!/usr/bin/env python3
import unittest
import requests
import json
import uuid
import os
from typing import Dict, Any, Optional

# Get the backend URL from the frontend .env file
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.strip().split('=')[1].strip('"\'')
    return None

# Base URL for API requests
BASE_URL = get_backend_url()
if not BASE_URL:
    raise ValueError("Could not find REACT_APP_BACKEND_URL in frontend/.env")

print(f"Using backend URL: {BASE_URL}")

class DigitalMaxProAPITest(unittest.TestCase):
    """Test suite for DigitalMax Pro API endpoints"""
    
    def setUp(self):
        """Set up test case - create a test contact for reuse"""
        self.api_url = f"{BASE_URL}/api"
        self.test_contact_id = None
        
        # Create a test contact for reuse in tests
        self.create_test_contact()
    
    def create_test_contact(self) -> Optional[str]:
        """Create a test contact and return its ID"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "service": "SEO",
            "message": "This is a test message for API testing."
        }
        
        response = requests.post(f"{self.api_url}/contact", json=contact_data)
        if response.status_code == 200:
            data = response.json()
            self.test_contact_id = data.get("contact_id")
            return self.test_contact_id
        return None
    
    def test_health_check(self):
        """Test the health check endpoint"""
        response = requests.get(f"{self.api_url}/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["database"], "connected")
        print("✅ Health check endpoint working correctly")
    
    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        contact_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "service": "Content Marketing",
            "message": "I need help with my content marketing strategy."
        }
        
        response = requests.post(f"{self.api_url}/contact", json=contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("contact_id", data)
        print("✅ Contact form submission working correctly")
    
    def test_contact_form_validation(self):
        """Test contact form validation for required fields and email format"""
        # Test missing name
        invalid_data = {
            "email": "test@example.com",
            "service": "SEO",
            "message": "Test message"
        }
        response = requests.post(f"{self.api_url}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)
        
        # Test invalid email
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email",
            "service": "SEO",
            "message": "Test message"
        }
        response = requests.post(f"{self.api_url}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)
        
        # Test missing message
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "service": "SEO"
        }
        response = requests.post(f"{self.api_url}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)
        
        print("✅ Contact form validation working correctly")
    
    def test_get_all_contacts(self):
        """Test retrieving all contacts"""
        response = requests.get(f"{self.api_url}/contacts")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("contacts", data)
        self.assertIn("count", data)
        self.assertIsInstance(data["contacts"], list)
        print("✅ Get all contacts endpoint working correctly")
    
    def test_get_contact_by_id(self):
        """Test retrieving a specific contact by ID"""
        if not self.test_contact_id:
            self.skipTest("No test contact available")
        
        response = requests.get(f"{self.api_url}/contacts/{self.test_contact_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("contact", data)
        self.assertEqual(data["contact"]["id"], self.test_contact_id)
        print("✅ Get contact by ID endpoint working correctly")
    
    def test_get_contact_not_found(self):
        """Test retrieving a non-existent contact"""
        fake_id = str(uuid.uuid4())
        response = requests.get(f"{self.api_url}/contacts/{fake_id}")
        self.assertEqual(response.status_code, 404)
        print("✅ Get non-existent contact returns 404 correctly")
    
    def test_update_contact_status(self):
        """Test updating a contact's status"""
        if not self.test_contact_id:
            self.skipTest("No test contact available")
        
        # Test valid status update
        response = requests.put(f"{self.api_url}/contacts/{self.test_contact_id}/status?status=contacted")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        
        # Verify the status was updated
        response = requests.get(f"{self.api_url}/contacts/{self.test_contact_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["contact"]["status"], "contacted")
        
        # Test invalid status
        response = requests.put(f"{self.api_url}/contacts/{self.test_contact_id}/status?status=invalid_status")
        self.assertEqual(response.status_code, 400)
        
        print("✅ Update contact status endpoint working correctly")
    
    def test_delete_contact(self):
        """Test deleting a contact"""
        # Create a contact specifically for deletion
        contact_data = {
            "name": "Delete Test",
            "email": "delete@example.com",
            "service": "Branding",
            "message": "This contact will be deleted."
        }
        
        response = requests.post(f"{self.api_url}/contact", json=contact_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        delete_id = data["contact_id"]
        
        # Delete the contact
        response = requests.delete(f"{self.api_url}/contacts/{delete_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        
        # Verify the contact was deleted
        response = requests.get(f"{self.api_url}/contacts/{delete_id}")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Delete contact endpoint working correctly")
    
    def test_delete_nonexistent_contact(self):
        """Test deleting a non-existent contact"""
        fake_id = str(uuid.uuid4())
        response = requests.delete(f"{self.api_url}/contacts/{fake_id}")
        self.assertEqual(response.status_code, 404)
        print("✅ Delete non-existent contact returns 404 correctly")
    
    def test_statistics_endpoint(self):
        """Test the statistics endpoint"""
        response = requests.get(f"{self.api_url}/stats")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("stats", data)
        
        # Check that all required statistics are present
        stats = data["stats"]
        self.assertIn("total_contacts", stats)
        self.assertIn("new_contacts", stats)
        self.assertIn("contacted", stats)
        self.assertIn("qualified", stats)
        self.assertIn("closed", stats)
        self.assertIn("service_breakdown", stats)
        
        print("✅ Statistics endpoint working correctly")

if __name__ == "__main__":
    unittest.main(verbosity=2)