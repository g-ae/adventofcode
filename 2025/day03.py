lines = []
with open("data.txt") as f:
    lines = f.readlines()

total = 0

lines = [x.replace("\n", "") for x in lines]

# PART 1
for l in lines:
    # plus grand nombre de tous
    biggest = max(l)
    occurrences = list(filter(lambda x: x==biggest, l))
    
    # si plusieurs fois le plus grand nombre c'est gg
    if len(occurrences) > 1:
        #print("+" + biggest * 2 + "->" + str(total + int(biggest*2)))
        total += int(biggest * 2)
        continue
    
    # vérif plus grand nombre après le plus grand
    biggest_index = l.find(biggest)
    list_next = l[biggest_index+1:]
    
    if len(list_next) != 0:
        # check devant
        next_biggest = max(list_next)
        #print("+" + biggest + next_biggest + "->" + str(total + int(biggest + next_biggest)))
        total += int(biggest + next_biggest)
    else:
        # check derrière
        list_before = l[:biggest_index]
        before_biggest = max(list_before)
        total += int(before_biggest + biggest)

print("Part 1:", total)

# Part 2 scrap tout
total = 0

order = []

# returns line index
def find_in(line: str, base_index = 0):
    if len(line) == 0 or (len(set(line)) == 0 and list(set(line))[0] == 0):
        return None
    
    biggest = max(line)
    line.find(biggest)
    
    biggest_index = line.find(biggest)
    order.append(base_index + biggest_index)
    
    find_in(line[biggest_index+1:], base_index + biggest_index + 1)
    find_in(line[:biggest_index], base_index)

for l in lines:
    num_jolts = 0
    order = []
    find_in(l)
    
    order = order[:12]
    order.sort()
    s = ""
    
    for i in order:
        s += l[i]
    total += int(s)

print("Part 2:", total)