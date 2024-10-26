# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the project files into the container at /usr/src/app
COPY ./pyproject.toml ./poetry.lock* /usr/src/app/

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --upgrade pip && \
    pip install poetry

# Configure Poetry: Do not create a virtual environment inside the Docker container
RUN poetry config virtualenvs.create false

# Install project dependencies
RUN poetry install --no-dev --no-interaction --no-ansi

# Copy the rest of the project into the container
COPY . /usr/src/app

# Copy the start.sh script into the container and make it executable
# COPY start.sh /usr/src/app/
# RUN sed -i 's/\r$//' /usr/src/app/start.sh && chmod +x /usr/src/app/start.sh

#Razvan e ciocan
EXPOSE 8001

CMD ["uvicorn", "api.main:app", "--reload", "--port", "8001"]
# Command to run the start.sh script
# CMD ["/usr/src/app/start.sh"]