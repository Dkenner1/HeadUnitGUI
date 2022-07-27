from flask import Blueprint, render_template, json, \
    redirect, request, url_for
import time
import webview
import webbrowser
from selenium import webdriver
from collections import defaultdict
from multiprocessing import Process

main = Blueprint('main', __name__, template_folder='../templates')


@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@main.route('/music', methods=['GET', 'POST'])
def music():
    return render_template('musicPlayer.html')


@main.route('/obd', methods=['GET', 'POST'])
def obd():
    return render_template('OBD.html')


@main.route('/settings', methods=['GET', 'POST'])
def settings():
    return render_template('settings.html')


@main.route('/youtube', methods=['GET', 'POST'])
def youtube():
    subWindow = Process(target=run, args=("https://youtube.com",))
    subWindow.start()
    return redirect('/')


@main.route('/maps', methods=['GET', 'POST'])
def maps():
    subWindow = Process(target=run, args=("https://google.com/maps",))
    subWindow.start()
    return redirect('/')


@main.route('/calendar', methods=['GET', 'POST'])
def calendar():
    subWindow = Process(target=run, args=("https://calendar.google.com/calendar/",))
    subWindow.start()
    return redirect('/')


# def run(webAddr):
#     print("Trying to create a new window")
#     print("webaddr is" + webAddr)
#     webview.create_window("ExtraWin", url=webAddr)
#     webview.start()
#
def run(webAddr):
    browser = webbrowser.get('windows-default')  # testlink: url='https://www.google.com'
    browser.open(webAddr)

# def run(webAddr):
#     driver = webdriver.Firefox()  #
#     driver.get("https://www.tutorialspoint.com/about/about_careers.htm")
#     driver.execute_script("window.open('');")
#     #C:\Program Files\chrome-win\chrome.exe
#     driver.close()
#     print("Closed driver")
