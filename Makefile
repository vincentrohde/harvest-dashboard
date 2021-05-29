dev:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
prod:
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
down:
	@docker-compose down
