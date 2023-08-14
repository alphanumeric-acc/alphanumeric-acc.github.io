---
title: "Mastering CORS with Nginx: The Proxy Solution"
meta_title: "proxy server,nginx,react,backend,api,cors"
description: "Ngix proxy server to bypass CORS and ensure seamless communication between your client and the distant API servers."
date: 2023-06-09T00:00:00+00:00
image: "/images/articles-assets/nginx-proxy-cors.jpeg"
categories: ["API", "Backend", "Frontend", "Web"]
author: "Mounir El Bakkali"
tags: ["nginx", "proxy", "cors", "react", "backend", "api"]
draft: false
---

#### Introduction
Have you ever been entangled in the web of <b> Cross-Origin Resource Sharing (CORS)</b> issues while working with external APIs? Fear not, for we're about to dive into a powerful solution that involves leveraging Nginx as a proxy server to bypass CORS and ensure seamless communication between your client and the distant API servers.

#### Understanding the CORS Conundrum
Picture this scenario: your application is trying to communicate with an external API hosted on a different server. A typical setup involves two different servers with distinct addresses. This very setup, while a security boon, often leads to CORS (Cross-Origin Resource Sharing) complications when the client-side code makes requests to these external APIs.

#####  The CORS Barrier
CORS issues, while a sign of robust browser security practices, can sometimes become an obstacle. This is especially true when you lack control over one or both servers, or when you seek to infuse your project with added flexibility.

#####  Enter the Proxy Server
The knight in shining armor here is the proxy server. Acting as an intermediary between your client and the target server, it gracefully circumvents CORS-related hurdles. But how?

#####  The Proxy Solution
When a client device makes a request via a proxy server, the latter takes the reins and sends the request to the backend server. Upon receiving the response, the proxy relays it back to the client. Crucially, the client sees the response as originating from its own domain, eliminating any hint of cross-origin involvement. This clever maneuver ensures a same-origin response, sparing you from CORS-induced turmoil.

#####  Real-World Application
To make these abstract notions concrete, consider the practical example of configuring an Nginx proxy. This setup paves the way for a React frontend app to seamlessly communicate with a backend server. Find the implementation details in the comments section.


#### Let's Get Technical

#####  Nginx Setup

Let's assume your React app is hosted on http://localhost:4200 and you want to make API requests to a backend server hosted on http://localhost:8080


1. Installing Nginx :


```javascript
sudo apt install nginx
sudo apt-get install nginx
```

2. Create a new Nginx configuration file for your app:


```javascript
sudo nano /etc/nginx/sites-available/my-app

```
3. Add the following configuration to the file (adjusting the values to match your setup):


```javascript
server {
    listen 80;
    server_name my-app.com; # Your domain or localhost

    location /api/ {
        proxy_pass http://localhost:8080; 
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        proxy_pass http://localhost:3000; 
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

4. Create a symbolic link to the sites-enabled directory:


```javascript
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled
```


5. Test the configuration and restart Nginx if needed:
 
    
```javascript
sudo nginx -t
sudo systemctl restart nginx
```
<br>
<br>


#### Conclusion
<br>

In a world where CORS barriers can occasionally slow down our development endeavors, the Nginx proxy emerges as a powerful ally. By mediating between your client and the target server, it eradicates CORS issues, facilitating uninterrupted communication. As you delve into the intricacies of proxy configuration, you're equipping yourself with a versatile tool that empowers your projects with seamless cross-origin communication. Say goodbye to CORS-induced headaches and hello to an Nginx-fueled journey of uninterrupted data flow. 