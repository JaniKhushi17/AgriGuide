
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGO_DB_NAME")]


users_collection = db["userfarm"]  
labour_collection = db['labour']
