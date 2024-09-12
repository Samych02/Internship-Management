# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target folder to the container
COPY target/Internship-Management-Backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8081, but only for internal access via Docker Compose
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
