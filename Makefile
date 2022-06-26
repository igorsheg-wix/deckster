.PHONY: start-dev esbuild-watch esbuild-serve

default:  start-dev

dev-client:
	cd web && yarn build

dev-backend:
	air

dev:
	make -j 2 dev-client dev-backend


setup-env-wev:
	cd web && yarn

seteup-env-backend:
	go mod tidy