dev\:install:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml build --no-cache
dev\:up:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up
dev\:down:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down
dev\:uninstall:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down --rmi all
prod\:install:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml build
prod\:install\:nocache:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml build --no-cache
prod\:up:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d
prod\:down:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down
prod\:uninstall:
	@docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down --rmi all
