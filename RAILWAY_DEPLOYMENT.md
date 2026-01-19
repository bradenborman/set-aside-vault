# Railway Deployment Guide

## Quick Start

This application is configured for Railway deployment with the following setup:

### 1. Railway Configuration Files

- **nixpacks.toml**: Configures build environment (JDK 21 + Node.js)
- **railway.json**: Configures deployment settings and start command

### 2. Environment Variables to Set in Railway

Set these in your Railway project settings:

```
SPRING_PROFILES_ACTIVE=cloud
PORT=<automatically set by Railway>
STORAGE_PATH=/app/uploads
```

### 3. Volume Mount

Create a Railway volume and mount it to `/app/uploads` for persistent image storage.

### 4. Spring Boot Profiles

The application uses Spring profiles for environment-specific configuration:

- **application.yml**: Base configuration
- **application-cloud.yml**: Cloud/Railway settings (checked into git)
- **application-local.yml**: Local development settings (NOT checked into git)

The active profile is set via `SPRING_PROFILES_ACTIVE` environment variable.

### 5. Build Process

Railway will automatically:
1. Install JDK 21 and Node.js
2. Run `./gradlew build -x test`
   - Builds the React client with Vite
   - Copies client assets to server resources
   - Packages everything into a single JAR
3. Start the application with `java -jar server/build/libs/server-0.0.1-SNAPSHOT.jar`

### 6. Testing Locally

```bash
# Build everything
./gradlew clean build

# Run the server (serves both frontend and API)
./gradlew :server:bootRun

# Access at http://localhost:8080
```

### 7. Endpoints

- `/` - React frontend (hello world page)
- `/api/hello` - Test endpoint
- `/api/health` - Health check endpoint

## Next Steps

After confirming the hello world deployment works on Railway:
1. Create the volume mount in Railway
2. Continue with the remaining tasks to build out the full image gallery functionality
