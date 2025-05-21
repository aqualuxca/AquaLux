# Use an official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy code and install dependencies
COPY . .
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Start app
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
