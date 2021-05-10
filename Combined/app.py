import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import flask_sqlalchemy
from flask import Flask, jsonify, render_template
from flask_bootstrap import Bootstrap

engine = create_engine("sqlite:///Analysis/pokemonGo.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Pokemon_Base_Stats_Table = Base.classes.pokemon_base_stats
Pokemon_Charged_Moves = Base.classes.pokemon_charged_moves
Pokemon_Fast_Move_Stats = Base.classes.pokemon_fast_move_stats
Pokemon_Fast_Moves = Base.classes.pokemon_fast_moves
Pokemon_Forms_Table = Base.classes.pokemon_forms
Pokemon_Names_Table = Base.classes.pokemon_names
Pokemon_Types_Table = Base.classes.pokemon_types


app = Flask(__name__)
Bootstrap(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1/base_stats")
def base_stats():

    #Return a list of Pokemon Go Base Stats
    session = Session(engine)    
    results = session.query(Pokemon_Base_Stats_Table.id, Pokemon_Base_Stats_Table.pokeform, Pokemon_Base_Stats_Table.base_attack, Pokemon_Base_Stats_Table.base_defense, Pokemon_Base_Stats_Table.base_stamina).all()
    return jsonify(results)

@app.route("/api/v1/charged_moves")
def charged_moves():

    #Return a list of Pokemon Go Charged Moves
    session = Session(engine)    
    results = session.query(Pokemon_Charged_Moves.id, Pokemon_Charged_Moves.charged_moves, Pokemon_Charged_Moves.form).all()
    return jsonify(results)

@app.route("/api/v1/fast_move_stats")
def fast_move_stats():

    #Return a list of Pokemon Go Fast Move Stats
    session = Session(engine)   
    results = session.query(Pokemon_Fast_Move_Stats.duration, Pokemon_Fast_Move_Stats.energy_delta, Pokemon_Fast_Move_Stats.move_id, Pokemon_Fast_Move_Stats.fast_move_name, Pokemon_Fast_Move_Stats.power, Pokemon_Fast_Move_Stats.stamina_loss_scaler, Pokemon_Fast_Move_Stats.fast_move_type).all()
    return jsonify(results)

@app.route("/api/v1/fast_moves")
def fast_moves():

    #Return a list of Pokemon Go Fast Moves
    session = Session(engine)    
    results = session.query(Pokemon_Fast_Moves.id, Pokemon_Fast_Moves.fast_moves, Pokemon_Fast_Moves.form).all()
    return jsonify(results)

@app.route("/api/v1/forms")
def forms():

    #Return a list of Pokemon Go Forms
    session = Session(engine)    
    results = session.query(Pokemon_Forms_Table.id, Pokemon_Forms_Table.pokeform).all()
    return jsonify(results)

@app.route("/api/v1/names")
def names():

    #Return a list of Pokemon Go Names
    session = Session(engine)    
    results = session.query(Pokemon_Names_Table.id, Pokemon_Names_Table.pokename).all()
    return jsonify(results)

@app.route("/api/v1/types")
def types():

    #Return a list of Pokemon Go Types
    session = Session(engine)    
    results = session.query(Pokemon_Types_Table.id, Pokemon_Types_Table.poketype).all()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
