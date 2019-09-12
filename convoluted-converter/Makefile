.PHONY: run

run:
	docker run \
		--rm \
		-it \
		-v $$(pwd):/app:ro \
		-w /app \
		node:10.16.3-alpine \
		/bin/sh
