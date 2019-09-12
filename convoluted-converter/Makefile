.PHONY: run

run:
	docker run \
		--rm \
		-it \
		-v $$(pwd)/convr.js:/app/convr.js:ro \
		-v $$(pwd)/test.js:/app/test.js:ro \
		-w /app \
		node:10.16.3-alpine \
		/bin/sh
