.PHONY: start-dev esbuild-watch esbuild-serve

default:  start-dev

web-watch:
	cd web &&  yarn run esbuild src/index.tsx --color=true --bundle --watch --color=true --outfile=www/static/bundle.js

web-serve:
	cd web && yarn run esbuild --servedir=www

server-watch-serve:
	air

start-dev:
	make -j 2 web-watch server-watch-serve 
