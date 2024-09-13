# Use an official Maven image as a build stage
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml file first to leverage Docker cache
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Run Maven build to download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Run the Maven package command to build the application
RUN ./mvnw clean package -DskipTests

# Use an official OpenJDK runtime as the base image for the final image
FROM openjdk:17-jdk-slim

# Set the working directory for the runtime container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
