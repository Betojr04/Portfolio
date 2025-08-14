from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)


@app.route("/")
def home_page():
    return render_template("HomePage/index.html")


@app.route("/projects")
def projects_page():
    return render_template("ProjectsPage/projects.html")


# @app.route("/finance")
# def finance_page():
#     return render_template("Finance/finance.html")


@app.route("/contact")
def contact_page():
    return render_template(
        "ContactPage/contact.html",
        emailjs_service_id=os.environ.get("EMAILJS_SERVICE_ID"),
        emailjs_template_id=os.environ.get("EMAILJS_TEMPLATE_ID"),
    )


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
