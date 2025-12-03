import json

# Test loading the data file
with open('portfolio_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    
print("Data loaded successfully!")
print(f"Keys: {list(data.keys())}")
print(f"\nPersonal data: {data.get('personal', {})}")
print(f"\nAbout data keys: {list(data.get('about', {}).keys())}")
