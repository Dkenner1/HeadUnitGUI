from flask import Flask
from multiprocessing import Process
import webview
import logging
from .util import threaded

from .routes import main

app = Flask('CarConsole',
            static_folder='src/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
app.logger.setLevel(logging.INFO)

app.register_blueprint(main.main)
# app.register_blueprint(service.service_routes)

class App:
    def __init__(self):
        #self.server = Process(target=self.run)
        #self.server.start()
        self.run()
        self.window = webview.create_window("CarConsole",
                                            url='http://localhost:593')  # testlink: url='https://www.google.com'
        self.window.events.closed += self.on_closed
        webview.start()

    def run(self):
        app.run(host='localhost', port=593, debug=True)

    def __del__(self):
        #self.server.terminate()
        print("Shutting down")

    def on_closed(self):
        self.__del__()
