from flask import Flask
import webview
import logging
from .util import threaded


# from routes import main, service
# from database.db import connect


class App():
    def __init__(self):
        # app.register_blueprint(main.main)
        # app.register_blueprint(service.service_routes)
        self.app = Flask('CarConsole')
        self.app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
        self.start_server()
        webview.create_window("CarConsole", url='http://localhost:593/')
        webview.start()

    @threaded
    def start_server(self):
        print('~ ' * 5)
        print('in start_server')
        self.app.logger.setLevel(logging.INFO)
        # serve(app, host='localhost', port=593)
        self.app.run(host='0.0.0.0', port=593)
