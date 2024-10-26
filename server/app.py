from flask import Flask, redirect, request, jsonify
import os
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)


@app.route("/auth_url")
def get_auth_url():
    # OAuth2 parameters
    oauth2_endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": os.getenv("CLIENT_ID"),
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
    }

    # Construct the authorization URL
    auth_url = f"{oauth2_endpoint}?{urlencode(params)}"

    # Return URL as JSON response (or redirect, if desired)
    return jsonify({"auth_url": auth_url})


if __name__ == "__main__":
    app.run(debug=True)