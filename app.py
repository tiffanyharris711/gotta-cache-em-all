import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_bootstrap import Bootstrap

engine = create_engine("sqlite:///Analysis/pokemonGo.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Pokemon_Names_Table = Base.classes.pokemon_names
Pokemon_Forms_Table = Base.classes.pokemon_forms
Pokemon_Types_Table = Base.classes.pokemon_types
Pokemon_Base_Stats_Table = Base.classes.pokemon_base_stats

app = Flask(__name__)
Bootstrap(app)

@app.route("/")
def index():
    print('Hello')
    return render_template("index.html")

@app.route("/api/v1/names")
def names():
    #Return a list of Pokemon Go Names
    
    session = Session(engine)    
    results = session.query(Pokemon_Names_Table.id, Pokemon_Names_Table.pokename).all()
    return jsonify(results)

@app.route("/api/v1/forms")
def forms():
    #Return a list of Pokemon Go Forms
    
    session = Session(engine)    
    results = session.query(Pokemon_Forms_Table.id, Pokemon_Forms_Table.pokeform).all()
    return jsonify(results)

@app.route("/api/v1/types")
def types():
    #Return a list of Pokemon Go Types
    
    session = Session(engine)    
    results = session.query(Pokemon_Types_Table.id, Pokemon_Types_Table.poketype).all()
    return jsonify(results)

@app.route("/api/v1/base_stats")
def base_stats():
    #Return a list of Pokemon Go Base Stats
    
    session = Session(engine)    
    results = session.query(Pokemon_Base_Stats_Table.id, Pokemon_Base_Stats_Table.pokeform, Pokemon_Base_Stats_Table.base_attack, Pokemon_Base_Stats_Table.base_defense, Pokemon_Base_Stats_Table.base_stamina).all()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
