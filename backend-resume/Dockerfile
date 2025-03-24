FROM node:18-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --chown=node package.json package-lock.json ./

RUN npm ci --only=production

USER node

COPY --chown=node . /app

EXPOSE 3001

CMD ["node", "src/server.js"]