.PHONY: test

clean:
	rn -rf node_modules/

install:
	npm install

build:
	#./node_modules/.bin/browserify src/js/main.js -o dist/main.js -t babelify --debug
	./node_modules/.bin/node-sass src/scss/main.scss --output dist/
	cp src/index.html dist/index.html
	cp src/letter.html dist/letter.html
	cp src/about.html dist/about.html
	cp src/contact.html dist/contact.html
	cp src/team.html dist/team.html

run:
	./node_modules/.bin/static-server -p 1209

deploy:
	node ./scripts/deploy.js
