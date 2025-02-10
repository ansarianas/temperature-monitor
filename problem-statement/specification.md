# Technical Specification

## 1. System Requirements

### 1.1 Frontend View

#### Dashboard Requirements

-   Large central temperature display
-   Connection status indicator
-   Timestamp of last update
-   List of last 5 readings displaying:
    -   Temperature value
    -   Status badge (appears after processing)
    -   Relative timestamp
    -   Current connection state

### 1.2 Data Flow

#### Temperature Reading Lifecycle

1. Backend generates reading (temperature only)
2. Frontend displays initial reading
3. Processing service determines status
4. Frontend updates with status badge

## 2. Communication Protocols

### 2.1 REST Endpoints

#### Health Check

```
GET /api/health
Response: {
  status: 'ok' | 'error'
  timestamp: string
}
```

#### Process Reading (n8n Webhook or Node.js Endpoint)

```
POST /api/readings/process
Request: {
  id: string
  temperature: number
  timestamp: string
}
Response: {
  success: boolean
  reading: {
    id: string
    status: 'NORMAL' | 'HIGH'
    processedAt: string
  }
}
```

### 2.2 WebSocket Events

#### Emit Events (Server to Client)

1. temperature_reading

    ```
    {
      id: string
      temperature: number
      timestamp: string
    }
    ```

2. processed_reading
    ```
    {
      id: string
      temperature: number
      timestamp: string
      status: 'NORMAL' | 'HIGH'
      processedAt: string
    }
    ```

## 3. Processing Implementation Options

### 3.1 Preferred: n8n Workflow

-   Setup n8n workflow with webhook trigger
-   Process temperature threshold (> 25°C = HIGH)
-   Return processed data to backend
-   Maintain processing logic in workflow

### 3.2 Alternative: Node.js Processing

-   Implement processing service in backend
-   Maintain same data flow structure
-   Apply identical processing logic
-   Ensure consistent response format

## 4. Service Requirements

### 4.1 Backend Service

-   Generate temperature readings (15-30°C)
-   Emit readings every 2 seconds
-   Process status updates (n8n or internal)
-   Maintain MongoDB persistence
-   Handle WebSocket connections

### 4.2 Data Storage

-   Store all temperature readings
-   Maintain reading history
-   Track processing status
-   Enable efficient querying

## 5. Infrastructure

### 5.1 Docker Configuration

```yaml
services:
    frontend:
        ports: ["3000:3000"]
    backend:
        ports: ["5000:5000"]
    mongodb:
        ports: ["27017:27017"]
    n8n: # Optional if using n8n
        ports: ["5678:5678"]
```

### 5.2 Service Dependencies

-   Backend → MongoDB
-   Backend → Processing Service (n8n or Node.js)
-   Frontend → Backend (WebSocket)

## 6. Development Requirements

### 6.1 Core Technologies

-   Frontend: React 18+
-   Backend: Node.js 18+
-   Database: MongoDB
-   Processing: n8n (preferred) or Node.js
-   Container: Docker

### 6.2 Testing Requirements

-   Unit tests for core logic
-   Integration tests for API
-   WebSocket connection testing
-   Processing logic verification

### 6.3 Documentation Requirements

-   API specifications
-   WebSocket event documentation
-   Setup instructions
-   Processing implementation details
-   Testing guidelines

## 7. Success Metrics

### 7.1 Core Requirements

-   Real-time data flow
-   Accurate temperature processing
-   Responsive UI updates
-   Data persistence
-   Error handling

### 7.2 Excellence Indicators

-   n8n workflow implementation
-   Clean architecture
-   Comprehensive testing
-   Clear documentation
-   Professional code quality

Remember: While both processing approaches are acceptable, the n8n implementation demonstrates additional technical versatility and will be evaluated accordingly.
