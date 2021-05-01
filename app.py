import pandas as pd
import numpy as np
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
    
    results = session.query(NameTable.id).\
        (NameTable.name).\
        filter(NameTable.id== '25').all()

    temps = list(np.ravel(results))
    return jsonify(temps=temps)