export t=.
export args

lint:
	npx eslint --fix $(args) projects/$(t)

test:
	ng test

check: lint test

build:
	ng build ngx-antievil

publish: build
	cd dist/ngx-antievil && yarn publish --access public

pack:
	ng build ngx-antievil && cd dist/ngx-antievil && yarn pack && mv slimebones-ngx-antievil-v*.tgz ../
