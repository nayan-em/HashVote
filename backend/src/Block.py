from datetime import datetime

class transaction:

    def __init__(self, voterId, voterName, candId, candName, pollId, pollName):
        """
        A class to implement a simple data structure that can be used to create transactions
        """
        self.voterId = voterId
        self.voterName = voterName
        self.candId = candId
        self.candName = candName
        self.pollId = pollId
        self.pollName = pollName

class block:
    def __init__ (self, index, timestamp, data, prevhash, hash, nonce):
        """
        The main method to implement blocks to add in the blockchain
        :param difficulty: <int> The complexity of a hash to be achieved to be able to mine a new block
        :var timestamp: <int> Time when the block is mined
        :var data: <list> The pool of verified transactions to be included in the block
        :var prevhash: <block obj> The hash of the most recent block that has been verified and added to the blockchain
        :var hash: <string> The hash of the block obtained by hashing all the data contained in the block
        """
        self.index = index
        self.timestamp = timestamp 
        self.data = data 
        self.prevhash = prevhash 
        self.hash = hash
        self.nonce = nonce
    
    @staticmethod
    def createGenesis(hash):
        """ 
        A static method to create the first genesis block for the blockchain like data in genesis of bitcoin
        :param hash: <string> The hash for the block
        """
        return block(0, datetime.now(), [transaction("", "", "", "", "", "")], "This is a Genesis Block", hash, 0)

voters = []
candidates = []