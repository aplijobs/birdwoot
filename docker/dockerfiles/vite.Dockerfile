FROM chatwoot:development

ENV PNPM_HOME="/home/appuser/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /app && chown -R appuser:appgroup /app

WORKDIR /app

RUN chmod +x docker/entrypoints/vite.sh

USER appuser

EXPOSE 3036
CMD ["bin/vite", "dev"]
