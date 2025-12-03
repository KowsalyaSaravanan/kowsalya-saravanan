# FastAPI Backend for Portfolio Contact Form

## Prerequisites
- Python 3.8 or higher
- Gmail account (or other SMTP email service)

## Installation

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Create a `.env` file in the backend directory:
```bash
copy .env.example .env
```

3. Configure your email settings in `.env`:

### For Gmail:
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security > 2-Step Verification > App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

4. Update `.env` file:
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-16-char-app-password
RECEIVER_EMAIL=your-email@gmail.com
```

### For Other Email Providers:

**Outlook/Hotmail:**
```
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
```

**Yahoo:**
```
SMTP_SERVER=smtp.mail.yahoo.com
SMTP_PORT=587
```

## Running the Backend

### Option 1: Using Python directly
```bash
cd backend
python main.py
```

### Option 2: Using Uvicorn
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will start on `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- **Interactive API docs (Swagger):** http://localhost:8000/docs
- **Alternative API docs (ReDoc):** http://localhost:8000/redoc

## Testing

### Using curl:
```bash
curl -X POST http://localhost:8000/api/send-email \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Test message\"}"
```

### Using the Swagger UI:
1. Go to http://localhost:8000/docs
2. Click on POST /api/send-email
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

## Troubleshooting

**Gmail "Less secure app" error:**
- Use App Passwords instead of your regular password
- Make sure 2-Step Verification is enabled

**Connection refused:**
- Check if the backend server is running
- Verify the port 8000 is not in use

**SMTP Authentication failed:**
- Double-check your email and password in `.env`
- For Gmail, ensure you're using an App Password, not your regular password

**CORS errors:**
- The backend is configured to allow all origins
- Make sure the frontend is making requests to http://localhost:8000
