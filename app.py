import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///pokemonGo.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Pokemon_Names_Table = Base.classes.tablename


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Pokemon Go Analysis API!<br/>"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/names<br/>"
#     )


@app.route("/api/v1.0/names")
def names():
    """Return a list of Pokemon Go Names"""
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    results = session.query(Pokemon_Names_Table.id).all()

    # all_names = list(np.ravel(results))
    return jsonify(results)