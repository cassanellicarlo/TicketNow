FROM openjdk:8-jdk-alpine

RUN apk update && apk add bash
RUN mkdir -p /opt/app

ENV PROJECT_HOME /opt/app

ARG JAR_FILE="./target/ticketnow-0.0.1-SNAPSHOT.jar"
COPY $JAR_FILE $PROJECT_HOME/app.jar

WORKDIR $PROJECT_HOME

ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar ./app.jar
