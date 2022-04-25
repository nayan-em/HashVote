import sqlite3 as sql

def insertUser(id, name, password):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO users VALUES (?,?,?);", (id, name, password))
  con.commit()
  con.close()

def getUser(id):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM users WHERE users.id=?;", (id,))
  user = cur.fetchall()
  con.commit()
  con.close()
  return user

def getAllPolls():
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM polls")
  polls = cur.fetchall()
  con.commit()
  con.close()
  return polls
  
def getPoll(pollId):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM polls WHERE polls.id=?;", (pollId,))
  polls = cur.fetchall()
  con.commit()
  con.close()
  return polls

def insertPoll(name, desc):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO polls (name,desc) VALUES (?, ?);", (name, desc))
  con.commit()
  con.close()

def insertCandidate(pollId, name, desc):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("INSERT INTO candidates (pollId,name,desc) VALUES (?,?,?);", (pollId, name, desc))
  con.commit()
  con.close()

def getCandidates(pollId):
  con = sql.connect("database.db")
  cur = con.cursor()
  cur.execute("SELECT * FROM candidates WHERE candidates.pollId=(?);", (pollId,))
  candidates = cur.fetchall()
  con.commit()
  con.close()
  return candidates