import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


engine = create_engine("sqlite:///pokemonGo.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Pokemon_Names_Table = Base.classes.tablename

app = Flask(__name__)


@app.route("/")
def home():
    print('Hello')
    return render_template("index.html")

@app.route("/api/v1.0/names")
def names():
    """Return a list of Pokemon Go Names"""
    
    session = Session(engine)
    
    results = session.query(Pokemon_Names_Table.id, Pokemon_Names_Table.pokename).all()

    # all_names = list(np.ravel(results))
    return jsonify(results)


if __name__ == '__main__':
    app.run()
