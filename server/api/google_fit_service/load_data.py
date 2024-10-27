from fastapi import FastAPI, HTTPException, Depends
import requests


# Define the base URL for Google Fit API
GOOGLE_FIT_API_BASE_URL = "https://www.googleapis.com/fitness/v1/users/me/dataSources"

# Define headers with OAuth2 token
def get_headers(token: str):
    return {
        "Authorization": f"Bearer {token}"
    }

# Function to call Google Fit API with a specific endpoint
def call_google_fit_api(token: str, data_type: str):
    url = f"{GOOGLE_FIT_API_BASE_URL}/{data_type}/datasets"
    headers = get_headers(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.json())

def get_fitness_data(token: str):
    scopes = [
        "activity", "blood_pressure", "heart_rate", "nutrition", 
        "oxygen_saturation", "sleep", "body_temperature", "body", "blood_glucose"
    ]
    
    results = {}
    for scope in scopes:
        try:
            # Call each scope-specific endpoint and collect the data
            results[scope] = call_google_fit_api(token, scope)
        except HTTPException as e:
            results[scope] = {"error": f"Failed to retrieve data for {scope}"}
    return results

