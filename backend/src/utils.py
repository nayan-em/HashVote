from hashlib import sha256
import json

def createHash(block_trans, time, prevhash, nonce):
    """
    A utility function use sha256 to hash the contents of the block
    """
    return sha256((str(time)+str(block_trans)+str(prevhash)+str(nonce)).encode()).hexdigest()

def viewUser(voter, blockchain):
    """
    A utility function to list all successful transactions against the user.
    """
    index = 1
    print("Transaction history of {}: ".format(voter))
    for block in blockchain:
        for trans in block.data:
            if trans.voter == voter:
                print("  {}. ".format((index)) + str(trans.voter) + " voted for " + "Candidate {}".format(trans.candidate))
                index += 1

    print("\n")

def voteCount(blockchain, pollId):
    """
    A utility function to count the no. of votes secured be each candidate
    """
    voters = []
    candidates = []
    for block in reversed(blockchain):
        for trans in reversed(block.data):
            print(trans.voterId, trans.voterName, trans.candId, trans.candName, trans.pollId, trans.pollName)
            if (trans.pollId == pollId) and (trans.voterId not in voters):
                voters.append(trans.voterId)
                candidates.append(trans.candId)

    print("____________________")
    print(voters, candidates)
    result = {}
    for cand in candidates:
        if cand in result:
            result[cand] += 1
        else:
            result[cand] = 1

    print(result)
    return result
                


def printMyBlocks(index, block, userId):
    blockData = []
    for index, trans in enumerate(block.data):
        if(trans.voterId == userId):
            blockData.append("  {}. ".format((index+1)) + str(trans.voterName) + " voted for the " + "candidate {}".format(trans.candName))
        
    return [block.index, block.timestamp, block.hash, block.prevhash, blockData]

def printAllBlocks(index, block):
    blockData = []
    for index, trans in enumerate(block.data):
        blockData.append("  {}. ".format((index+1)) + str(trans.voterName) + " voted for the " + "candidate {}".format(trans.candName))
        
    # print("\n", '-'*75, "\n")     
    return [block.index, block.timestamp, block.hash, block.prevhash, blockData]

 
def printMyTrans(blockchain, userId):
    """
    A function to print all transactions of a user
    """

    result = []
    genesis = [blockchain[0].index, blockchain[0].timestamp, blockchain[0].hash, blockchain[0].prevhash, ["No Transactions"]]
    result.append(genesis)

    for index, block in enumerate(blockchain[1:]):
        temp = printMyBlocks(index+1, block, userId)
        if(len(temp[4]) != 0):
            result.append(temp)

    return result

def printBlockchain(blockchain):
    """
    A function to print the entire blockchain
    """

    result = []
    genesis = [blockchain[0].index, blockchain[0].timestamp, blockchain[0].hash, blockchain[0].prevhash, ["No Transactions"]]
    result.append(genesis)

    for index, block in enumerate(blockchain[1:]):
        result.append(printAllBlocks(index+1, block))

    return result