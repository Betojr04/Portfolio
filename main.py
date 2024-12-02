from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/")
def server_check():
    return "<h1>Hello, the server is up and running</h1>"


if __name__ == "__main__":
    app.run(debug=True)
