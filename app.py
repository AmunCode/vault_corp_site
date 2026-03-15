from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html", title="Vault Retail Group | Home")


@app.route("/about")
def about():
    return render_template("about.html", title="Vault Retail Group | About Us")


@app.route("/inventory")
def inventory():
    return render_template("inventory.html", title="Vault Retail Group | Inventory Available")


@app.route("/contact")
def contact():
    return render_template("contact.html", title="Vault Retail Group | Contact Us")


if __name__ == "__main__":
    app.run(debug=True)