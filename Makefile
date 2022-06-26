.PHONY: dev dev-backend dev-client

default:  dev

dev-client:
	cd web && yarn dev

dev-backend:
	air

dev:
	make -j 2 dev-client dev-backend

setup-env-wev:
	cd web && yarn

seteup-env-backend:
	go mod tidy

build:
	 CGO_ENABLED=0 GOOS=linux GOARCH=amd64  go build -o deckster 