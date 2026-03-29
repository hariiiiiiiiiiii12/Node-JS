# Node.js — Servers, Sockets and WebSockets

## What is a Server

A server can refer to both hardware and software.

### Hardware Server

A hardware server is a physical machine that stores data and processes requests from clients.

Example:

```
Physical computer located in a data center
```

This machine runs:

- an operating system
- server software
- applications

---

### Software Server

A software server is an application that runs on top of the operating system.

This application is responsible for handling incoming requests from clients and sending responses back.

Example:

```
Node.js server
Express server
Apache server
Nginx server
```

The server application sits above the operating system and interacts with hardware through the OS.

The operating system acts as the bridge between the application and the hardware.

---

# Role of the Operating System

The operating system enables communication between:

```
Application Server
Hardware Server
```

Just like in a normal computer system.

The application sends requests through the OS, and the OS interacts with the hardware.

---

# Client and Server Communication

When a user interacts with a website or an application, the client sends a request to the server.

Example:

```
Client → Server → Response
```

The server waits for requests and processes them when they arrive.

---

# Socket Connection

Communication between a client and server happens through **sockets**.

A socket represents a connection between the client and the server.

Typical flow:

1. Client sends a request
2. A socket connection is established
3. Server processes the request
4. Server sends the response
5. Connection is closed

Example:

```
Client → Request → Server
Server → Response → Client
Connection closed
```

If another request is made, a **new socket connection** must be established.

---

# WebSockets

WebSockets are different from normal socket connections used in HTTP.

Normal sockets in HTTP behave like this:

```
Request → Response → Connection closed
```

WebSockets provide **persistent connections**.

This means:

- The connection remains open
- Both client and server can continuously exchange data

Example use cases:

- Real-time chat applications
- Online gaming
- Live notifications
- Real-time collaboration tools

---

# Key Difference

Normal HTTP Socket:

```
Request sent
Response received
Connection closed
```

WebSocket:

```
Connection established
Connection stays open
Two-way communication continues
```

---

# Server Behavior

A server continuously waits for incoming requests.

Example process:

1. Server starts running
2. Server listens on a specific port
3. Client sends a request
4. Server processes the request
5. Server sends the response

This process repeats for every incoming request.

---

# Key Takeaways

- A server can refer to hardware or software
- Software servers run on top of an operating system
- The operating system connects applications with hardware
- Clients communicate with servers using sockets
- Standard HTTP sockets close after sending a response
- WebSockets maintain persistent connections
- Servers continuously listen for incoming requests
```