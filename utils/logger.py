import logging

def get_logger(name):
    '''
    Returns logger with name.

    @param name: Logger name
    '''
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    sh = logging.StreamHandler()
    sh.setFormatter(logging.Formatter(
        "%(asctime)s.%(msecs)03d %(levelname)s {%(module)s} [%(funcName)s] %(message)s",
        datefmt="%Y-%m-%d,%H:%M:%S",
    ))
    logger.addHandler(sh)
    return logger

__all__ = ['get_logger']
