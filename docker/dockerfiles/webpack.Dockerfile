FROM chatwoot/chatwoot:latest

RUN chmod +x docker/entrypoints/webpack.sh

EXPOSE 3035
CMD ["bin/webpack-dev-server"]
