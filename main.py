from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


@app.route("/")
def home_page():
    return render_template("index.html")


@app.route("/projects")
def projects_page():
    return render_template("projects.html")


@app.route("/contact")
def contact_page():
    return render_template("contact.html")


@app.route("/resume")
def resume_page():
    return render_template("resume.html")


@app.route("/freelance")
def freelaner_page():
    return render_template("freelancer.html")


if __name__ == "__main__":
    app.run(debug=True)
