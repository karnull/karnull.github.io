FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04 AS base

ENV USER=vscode
ENV DEBIAN_FRONTEND=noninteractive

USER root

RUN echo "Defaults:${USER} passwd_tries=0" > /etc/sudoers.d/${USER}

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    ca-certificates \
    git

USER ${USER}

# Developer enhancements
# Not required for build, but useful for development
FROM base AS dev_base

USER root

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get install --no-install-recommends -y \
    openssh-client

USER ${USER}

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=

