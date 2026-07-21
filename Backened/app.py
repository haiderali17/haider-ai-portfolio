from flask import Flask, request, jsonify, render_template, redirect, session
from flask_cors import CORS
import sqlite3


app = Flask(__name__)

CORS(app)


# session secret key
app.secret_key = "haider_secret_key"





# DATABASE


def create_database():


    connection = sqlite3.connect("database.db")


    cursor = connection.cursor()


    cursor.execute(
        """

        CREATE TABLE IF NOT EXISTS messages(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT,

            email TEXT,

            message TEXT

        )

        """
    )


    connection.commit()

    connection.close()



create_database()







# HOME


@app.route("/")


def home():


    return jsonify(

        {

            "message":"Backend Running 🚀"

        }

    )








# CONTACT API


@app.route("/contact", methods=["POST"])


def contact():


    data = request.json



    connection = sqlite3.connect("database.db")


    cursor = connection.cursor()



    cursor.execute(

        "INSERT INTO messages(name,email,message) VALUES(?,?,?)",


        (

            data["name"],

            data["email"],

            data["message"]

        )

    )



    connection.commit()


    connection.close()



    return jsonify(

        {

            "message":"Message saved 🚀"

        }

    )









# LOGIN PAGE


@app.route("/login",
methods=["GET","POST"])


def login():


    if request.method == "POST":



        username = request.form["username"]

        password = request.form["password"]




        if username == "haider" and password == "admin123":


            session["admin"] = True


            return redirect("/admin")



        else:


            return "Wrong username or password ❌"




    return render_template("login.html")










# ADMIN DASHBOARD


@app.route("/admin")


def admin():


    if "admin" not in session:


        return redirect("/login")




    connection = sqlite3.connect("database.db")


    cursor = connection.cursor()



    cursor.execute(
        "SELECT * FROM messages"
    )


    messages = cursor.fetchall()


    connection.close()



    return render_template(

        "admin.html",

        messages=messages

    )









# LOGOUT


@app.route("/logout")


def logout():


    session.clear()


    return redirect("/login")








if __name__ == "__main__":


    app.run(debug=True)