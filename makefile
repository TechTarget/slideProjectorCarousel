SCRIPT_NAME = slideProjectorCarousel

default:

	@echo "* compiling jade templates..."
	@jade -P ./example/index.jade

	@echo "* compiling sass..."
	@sass --compass --style compact ./example/sass/style.scss ./example/css/style.css

	@echo "* linting javascript..."
	@jshint ${SCRIPT_NAME}.js --show-non-errors

	@echo "* minifying..."
	@uglifyjs ${SCRIPT_NAME}.js \
						--output ${SCRIPT_NAME}.min.js \
						--source-map ${SCRIPT_NAME}.min.js.map  \
						--compress \
						--mangle \
						--comments '/^!\s/'