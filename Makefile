network:
	@docker network create harvest.dashboard
dev\:install:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml build
dev\:up:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up
dev\:down:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down
dev\:uninstall:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down --rmi all
prod\:install:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.prod.yml build
prod\:up:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d
prod\:down:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down
prod\:uninstall:
	@docker-compose --env-file .env -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down --rmi all
verification-server\:dev\:install:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.dev.yml build
verification-server\:dev\:up:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.dev.yml up
verification-server\:dev\:down:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.dev.yml down
verification-server\:dev\:uninstall:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.dev.yml down --rmi all
verification-server\:prod\:install:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.prod.yml build
verification-server\:prod\:up:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.prod.yml up
verification-server\:prod\:down:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.prod.yml down
verification-server\:prod\:uninstall:
	@docker-compose --env-file .env -f docker/docker-compose.verification.yml -f docker/docker-compose.verification.prod.yml down --rmi all
