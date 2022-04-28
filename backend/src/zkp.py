import random, timeit
from Crypto.Util import number

class zkp:
    def __init__(self, id):
        self.id = self.getID(id)
        self.P = self.genLargePrime(15)
        self.g = self.getGenerator()
        self.r = random.randint(0, self.P - 1)

        self.y = pow(self.g, self.id) % self.P
        self.h = pow(self.g, self.r) % self.P

    def round(self, h):
        b = random.randint(0,1)
        s = (self.r + b*self.id) % (self.P - 1)

        LHS = pow(self.g, s) % self.P
        RHS = h * pow(self.y, b) % self.P 
        return LHS == RHS

    def __str__(self):
        line = "This is a zkp object created for the voter ID number {}, Large Prime: {} and Generator: {}".format(self.pan, self.P, self.g)
        return str(line)

    @staticmethod
    def printInfo():
        print("""This is a zkp class object created. It will just verify that the user has a password or
                something unique like a Voter ID in our case which will be hashed and converted to a unique value which
                is sent to the server. The original unique value is kept secret and will never reach the server.""")

    @staticmethod
    def genLargePrime(n_length = None):
        if not n_length:
            n_length = 1024
        primeNum = number.getPrime(n_length)
        return (primeNum)

    @staticmethod
    def getGenerator(range = 20):
        return random.randint(1, range)

    @staticmethod
    def getID(id):
        ans = 0
        place = 1
        for ch in id:
            ans += ord(ch)*pow(10,place)
        return ans

    

def __main__():
    start = timeit.default_timer()
    
    obj = zkp("2354")
    # print(obj)
    print('Time: ', timeit.default_timer() - start)  

# __main__()