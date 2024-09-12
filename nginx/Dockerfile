# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static image files into the Nginx HTML folder
COPY ./images /usr/share/nginx/html/images

# Expose port 80 for external access to Nginx
EXPOSE 80
