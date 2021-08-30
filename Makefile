prod:
	@docker-compose up -d
down:
	@docker-compose down
down-dev:
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
test:
	@echo "test"
