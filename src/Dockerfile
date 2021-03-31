FROM maven:latest
MAINTAINER Alex Guo, David Moon, Josh Woo, Lauren Choi
WORKDIR /backend

COPY . .
RUN mvn clean install
RUN mvn package
CMD ["./run"]

# IN TERMINAL: docker build -t everybody-app:latest .
