
FROM node:18

# Java for Android builds
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip

# Android SDK
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools

RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O tools.zip \
  && unzip tools.zip -d $ANDROID_SDK_ROOT/cmdline-tools \
  && mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/tools

ENV PATH="$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH"

RUN yes | sdkmanager --licenses >/dev/null
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
