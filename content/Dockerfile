# Build
FROM prologic/zs AS build

RUN mkdir -p /src

WORKDIR /src

# Copy content
COPY . .

# Build the site (in production mode)
RUN zs -p build

# Runtime
FROM prologic/zs AS runtime

COPY --from=build /src/.pub /data
