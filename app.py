import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/pokemonGo.sqlite", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
NameTable = Base.classes.tbl_pokemon_names

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"Welcome to the Pokemon Go Analysis API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
    )


@app.route("/api/v1.0/names")
def names():
    """Return a list of Pokemon Go Names"""
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"
    # list_of_names = session.query(NameTable.id, NameTable.name).limit(5).all()

    # list_names = {id in list_of_names, name in list_of_names}
    # return jsonify(list_names)

if __name__ == '__main__':
    app.run()
