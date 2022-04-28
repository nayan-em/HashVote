from src.Block import block, transaction
from src.utils import createHash
from hashlib import sha256
from datetime import datetime

class Blockchain:

    def __init__(self, difficulty):

        """
        The constructor which initializes our blockchain and makes two pools of transactions
        :param difficulty <int> The complexity of a hash to be achieved to be able to mine a new block
        :var blockchain: <list> A list which contains all the blocks in the blockchain
        :var transactions: <list> The pool of unverified transactions
        :var verified: <list> The pool of verified transactions that have been added in the blockchain
        :var prevblock: <block obj> The most recent block that has been verified and added to the blockchain
        """
    
        self.blockchain = []
        self.transactions = []
        self.verified = []

        gen = ""
        while not gen.startswith("0"*difficulty):
            gen = sha256((str(datetime.now()) + "Nayan | Tejas | Ashwin").encode()).hexdigest()
        self.blockchain.append(block.createGenesis(gen))
        self.prevblock = self.blockchain[-1]

    def makeTransaction(self, voterId, voterName, candId, candName, pollId, pollName):
        """
        Creates a new transaction object and adds it to the unverified pool of transactions
        :param name: <str> Identity of the Sender
        :param dir: <bool> The direction of the transaction (Money owed/given)
        :param qty: <int> Amount in the transaction
        """
        new_transaction = transaction(voterId, voterName, candId, candName, pollId, pollName)
        self.transactions.append(new_transaction)

    def getTransactions(self, number_of_transactions):
        """
        Makes a list of transactions from the unverified pool to be added in the new block
        :param number_of_transactions: <int> number of transactions to be added in the block
        """
        block_trans = []
        for _ in range(number_of_transactions):
            if(len(self.transactions) == 0):
                print("No transactions left in the unverified pool")
                break 
            else:
                new_transaction = self.transactions[-1]
                block_trans.append(new_transaction)
                self.verified.append(new_transaction)
                self.transactions.pop()
        return block_trans

    def mineBlock(self, number_of_transactions, difficulty, nonce = 0):
        """
        Mines and verifies a new block to add to the blockchain 
        :param difficulty <int> The complexity of a hash to be achieved to be able to mine a new block
        :var init_time: <time_t> The time when the mining for a new block is initalized
        """
        matchString = "0"*difficulty
        block_trans = self.getTransactions(number_of_transactions)
        
        init_time = datetime.now()
        h = createHash(block_trans, init_time, self.prevblock.hash, nonce)
        while not h.startswith(matchString):
            nonce += 1
            h = createHash(block_trans, init_time, self.prevblock.hash, nonce)

        print("Mining Successful at nonce: ", nonce)

        newBlock = block(len(self.blockchain), datetime.now(), block_trans, self.prevblock.hash, h, nonce)
        if(self.verify(newBlock)):
            self.blockchain.append(newBlock)
            self.prevblock = newBlock 
        else:
            print("Invalid Block Entry Rejected")

        # print("printing the blockchain")
        # for index, block in enumerate(self.blockchain):
        #     print(index, block.index)

    def verify(self, newBlock):
        """
        Verifies basic constraints for the new block 
        :param newBlock <block.object> The new unverified block to be added
        """
        if not (newBlock.timestamp >= self.prevblock.timestamp):
            return False
        if not (newBlock.prevhash == self.prevblock.hash):
            return False
        return True 
