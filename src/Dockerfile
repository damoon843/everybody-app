FROM maven:latest
MAINTAINER Alex Guo, David Moon, Josh Woo, Lauren Choi
WORKDIR /backend
#ENV DATABASE_URL="postgres://roifqtuewetfej:7d514e978ce5f83a75ca408a356cb5e5324a3657960f95a3533aeb93622c5906@ec2-52-7-115-250.compute-1.amazonaws.com:5432/d97rt21a1m7m9k"
#ENV ENCRYPTION_KEY="32TAsARETHEBEST"

COPY . .
RUN mvn clean install -Dmaven.test.skip=true
#RUN mvn package
#CMD ["./run"]

# IN TERMINAL: docker build -t everybody-app:latest .
