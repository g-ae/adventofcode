def calcScore(chosen: str, win: bool | None):
    """
    Takes boolean "win" as parameter, can also be None
    if is None : draw + 3pts
    True : win + 6pts
    False : loss + 0pts

    Chosen:
    X : Rock + 1 pt
    Y : Paper + 2 pts
    Z : Scissors + 3 pts
    
    Returns :
    Added score
    """
    score = 0

    if win == None:
        score += 3
    elif win == True:
        score += 6
    
    if chosen == "X":
        score += 1
    elif chosen == "Y":
        score += 2
    elif chosen == "Z":
        score += 3
    
    return score

def opponentHandToSame(hand: str):
    """
    Takes the opponents hand (A,B,C) and turns it into the same format as the user's (X,Y,Z)
    """
    return chr(ord((hand)[0]) + 23)

# Task 1

score = 0
f = open("data.txt", 'r')
data = f.read().split('\n')
for lin in data:
    [opp, me] = lin.split(' ')
    win = False

    if opponentHandToSame(opp) == me:
        win = None
    elif opponentHandToSame(opp) == "X" and me == "Y":
        win = True
    elif opponentHandToSame(opp) == "Y" and me == "Z":
        win = True
    elif opponentHandToSame(opp) == "Z" and me == "X":
        win = True

    score += calcScore(me, win)

print("Task 1 " + str(score))

# Task 2

score = 0
for lin in data:
    [opp, me] = lin.split(' ')

    if me == "X":   # Lose
        play = ord((opponentHandToSame(opp))[0]) - 1
        if (play == 87): play = 90
        score += calcScore(chr(play), False)
    elif me == "Y": # Draw
        score += calcScore(opponentHandToSame(opp), None)
    elif me == "Z": # Win
        play = ord((opponentHandToSame(opp))[0]) + 1
        if (play == 91): play = 88
        score += calcScore(chr(play), True)

print("Task 2 " + str(score))
