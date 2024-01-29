VENV_NAME = .venv
PYTHON_VERSION = 3

venv:
	python$(PYTHON_VERSION) -m venv $(VENV_NAME)

install:
ifeq ($(OS),Windows_NT)
	.\$(VENV_NAME)\Scripts\activate && pip install -r requirements.txt
else
	. $(VENV_NAME)/bin/activate && pip install -r requirements.txt
endif

setup: venv install

run:
	python -m app.main

