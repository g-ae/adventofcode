import re
from operator import mul
from functools import reduce

lines = []
with open("data.txt") as f:
    lines = f.readlines()

lines = [x.replace("\n", "") for x in lines]

total = 0
input = {}

OPERATION_LINE_INDEX = -1

for (li, l) in enumerate(lines):
    # regex, if no match, is operations
    nbs = re.findall(r"[0-9]+", l)
    for (ni, n) in enumerate(nbs):
        if ni not in input:
            input[ni] = [int(n)]
        else:
            input[ni].append(int(n))
    
    if len(nbs) == 0:
        # operations:
        ope = [x for x in l.split(' ') if x != ""]
        OPERATION_LINE_INDEX = li
        for (oi, o) in enumerate(ope):
            match o:
                case "+":
                    total += sum(input[oi])
                case "*":
                    total += reduce(mul, input[oi])

print("Part 1:", total)

# Toutes les lignes ont la même longueur

taille_ligne = len(lines[0])
total = 0
ci = taille_ligne - 1
num_start_ci = ci

current_data = []

while ci >= 0:
    data = ""
    for li in range(OPERATION_LINE_INDEX):
        data += lines[li][ci]
    
    if data.replace(" ", "") == "":
        # reset current_data
        current_data = []
        ci -= 1
        continue
    
    current_data.append(int(data))
    
    if lines[OPERATION_LINE_INDEX][ci] != " ":
        op = lines[OPERATION_LINE_INDEX][ci]
        match op:
            case "+":
                total += sum(current_data)
            case "*":
                total += reduce(mul, current_data)
    
    ci -= 1

print("Part 2:",total)