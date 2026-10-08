"""Serve the prototype on loopback only, with explicit Windows module MIME."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map,
                      '.mjs': 'text/javascript', '.js': 'text/javascript',
                      '.css': 'text/css', '.html': 'text/html'}

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    server = ThreadingHTTPServer(('127.0.0.1', 8810), partial(Handler, directory=str(root)))
    print('Lantern Harbor: http://127.0.0.1:8810 (Ctrl+C to stop)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
