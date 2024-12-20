from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


@app.route("/")
def home_page():
    return render_template("HomePage/index.html")


@app.route("/projects")
def projects_page():
    return render_template("ProjectsPage/projects.html")


@app.route("/contact")
def contact_page():
    return render_template("ContactPage/contact.html")


@app.route("/resume")
def resume_page():
    return render_template("ResumePage/resume.html")


@app.route("/freelance")
def freelaner_page():
    return render_template("FreelancingPage/freelancer.html")


@app.route("/recruiter")
def recruiter_page():
    return render_template("RecruiterPage/recruiter.html")


if __name__ == "__main__":
    app.run(debug=True)
