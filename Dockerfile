FROM golang:1.17-alpine as builder

WORKDIR /app 
COPY . .

RUN apk add yarn
RUN cd web && yarn install --ignore-engines && yarn build
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags="-w -s" -o deckster .

FROM scratch

COPY --from=builder /app/deckster /
COPY --from=builder /app/.env /

ENV GIN_MODE=release

CMD ["/deckster"]