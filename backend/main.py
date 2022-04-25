from flask import Flask, request, jsonify
import sqlite3 as sql
import models as dbHandler
import json

from src.Blockchain import Blockchain
from src.utils import printMyTrans, printBlockchain, voteCount
from src.zkp import gen_public_sig, verify
from datetime import datetime
import random as r, math, names

app = Flask(__name__)

conn = sql.connect('database.db')
cur = conn.cursor()
conn.execute("""CREATE TABLE IF NOT EXISTS users (
  id text primary key,
  name text not null,
  password text not null
)""")
conn.execute("""CREATE TABLE IF NOT EXISTS polls (
  id INTEGER primary key AUTOINCREMENT,
  name text not null,
  desc text not null
)""")
conn.execute("""CREATE TABLE IF NOT EXISTS candidates (
  id INTEGER primary key AUTOINCREMENT,
  pollId INTEGER not null,
  name text not null,
  desc text not null
)""")
conn.close()

# Initalize Blockchain object with given difficulty
difficulty = 3
max_trans_per_Block = 7
blockchain = Blockchain(difficulty)

@app.route('/user', methods=['POST'])
def registerUser():
    id = request.args.get('id')
    name = request.args.get('name')
    password = request.args.get('password')

    getUserData = dbHandler.getUser(id)
    if len(getUserData) != 0:
        return "Account already exists"
    else: 
        dbHandler.insertUser(id, name, password)
        return "Account registered successfully!"

@app.route('/user', methods=['GET'])
def verifyUser():
    id = request.args.get('id')
    password = request.args.get('password')

    getUserData = dbHandler.getUser(id)
    if len(getUserData) == 0:
        return "ID does not exists"
    elif password != getUserData[0][2]:
        return "Incorrect password"
    else:
        return "Account verified successfully!"

@app.route('/getUser', methods=['GET'])
def getUserDetails():
    id = request.args.get('id')
    getUserData = dbHandler.getUser(id)
    return jsonify(getUserData[0])

@app.route('/poll', methods=['POST'])
def registerPoll():
    name = request.args.get('name')
    desc = request.args.get('desc')
    dbHandler.insertPoll(name, desc)
    return "Poll registered successfully!"

@app.route('/allPolls', methods=['GET'])
def getAllPoles():
    polls = dbHandler.getAllPolls()
    return jsonify(polls)

@app.route('/getPoll', methods=['GET'])
def getPollDetails():
    id = request.args.get('id')
    getUserData = dbHandler.getPoll(id)
    return jsonify(getUserData)

@app.route('/candidate', methods=['GET'])
def getAllCandidates():
    pollId = request.args.get('id')
    candidates = dbHandler.getCandidates(pollId)
    return jsonify(candidates)

@app.route('/candidate', methods=['POST'])
def registerCandidate():
    id = request.args.get('id')
    name = request.args.get('name')
    desc = request.args.get('desc')
    dbHandler.insertCandidate(id, name, desc)
    return "Poll registered successfully!"

@app.route('/vote', methods=['POST'])
def vote():
    voterId = request.args.get('voterId')
    voterName = request.args.get('voterName')
    candId = request.args.get('candId')
    candName = request.args.get('candName')
    pollId = request.args.get('pollId')
    pollName = request.args.get('pollName')
    blockchain.makeTransaction(voterId, voterName, candId, candName, pollId, pollName)
    print("trans added to pool")
    for x in blockchain.transactions:
        print(x.voterName, x.candName)
    print("printing done")
    return "Vote placed successfully!"


@app.route('/viewTrans', methods=['GET'])
def viewTrans():
    userId = request.args.get('userId')
    while len(blockchain.transactions) > 0:
        blockchain.mineBlock(max_trans_per_Block, difficulty)
    print("badiya blockchain: ", printMyTrans(blockchain.blockchain, userId))
    return jsonify(printMyTrans(blockchain.blockchain, userId))

@app.route('/viewBlockchain', methods=['GET'])
def viewBlockchain():
    while len(blockchain.transactions) > 0:
        blockchain.mineBlock(max_trans_per_Block, difficulty)
    return jsonify(printBlockchain(blockchain.blockchain))

@app.route('/countVotes', methods=['GET'])
def countVotes():
    pollId = request.args.get('pollId')
    while len(blockchain.transactions) > 0:
        blockchain.mineBlock(max_trans_per_Block, difficulty)

    candidates = dbHandler.getCandidates(pollId)
    votes = []
    temp = voteCount(blockchain.blockchain, pollId)

    for candidate in candidates:
        if str(candidate[0]) in temp:
            votes.append(temp[str(candidate[0])])
        else:
            votes.append(0)

    result = {}
    result["candidates"] = candidates
    result["votes"] = votes
    return jsonify(result)

@app.route('/zkp', methods=['GET'])
def verifyZKP():
    secretKey = request.args.get('secretKey')
    signature = gen_public_sig(secretKey, "1 vote")
    print(verify(signature))
    return verify(signature)

if __name__ == '__main__':
    app.run(debug = True)


    