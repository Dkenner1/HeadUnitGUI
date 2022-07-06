import threading



def threaded(func):
    def threadedfunc(*args, **kwargs):
        thrd = threading.Thread(target=func, args=args, kwargs=kwargs)
        thrd.start()
    return threadedfunc