import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "testgen.settings")

from testgen.wsgi import app
