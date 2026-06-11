FROM debian:trixie-slim AS base

# Configuration
ENV DEBIAN_FRONTEND=noninteractive
USER root

# Install dependencies
RUN apt update && apt upgrade -y \
    && apt install --no-install-recommends -y \
        ca-certificates \
        bash \
    && apt clean \
    && apt autoremove \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid 1000 user \
    && useradd \
        --uid 1000 \
        --gid user \
        --create-home \
        --home-dir /home/user \
        --shell /bin/bash \
        --skel /etc/skel \
        user \
    && passwd -d user \
    && chown -R user:user /home/user

# Switch to non-root user
USER user
WORKDIR /home/user

# Reset frontend to interactive
ENV DEBIAN_FRONTEND=dialog
