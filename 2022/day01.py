def split(val):
    return val.split('\n')

f = open("data.txt", 'r')

most = -1   # Task 1
t2 = list() # Task 2

for i in list(map(split, f.read().split('\n\n'))):
    temp = 0
    for v in i:
        temp += int(v)
    # Task 1
    if temp > most: 
        most = temp
    # Task 2
    t2.append(temp)

t2.sort(reverse=True)
tot = 0

for i in range(3):
    tot += t2[i]

print("Task1 : " + str(most))
print("Task2 : " + str(tot))