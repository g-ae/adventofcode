lines = []
with open("data.txt") as f:
    lines = f.readlines()

total = 0

lines = [x.replace("\n", "") for x in lines]

i = 0
fresh_arr = []
fresh = 0

while lines[i] != "":
    # premier passage = ranges
    spl = lines[i].split('-')
    fresh_arr.append((int(spl[0]), int(spl[1])))
    
    i += 1

i += 1

while i < len(lines):
    val = int(lines[i])
    for r in fresh_arr:
        if val >= r[0] and val <= r[1]:
            fresh += 1
            break
    i += 1
    
print("Part 1: ", fresh)

i = 0
ids = 0

fresh_arr.sort()

ti = 0
while ti < len(fresh_arr):
    t = fresh_arr[ti]
    print("Traitement", t)
    if ti == 0:
        print(t, t[1] - t[0] + 1)
        ids += t[1] - t[0] + 1
        print(ids)
        ti += 1
        continue
    
    last = fresh_arr[ti-1]
    
    if last[1] >= t[0]:
        print(t[1], last[1])
        if t[1] <= last[1]:
            print("Delete actuel")
            del fresh_arr[ti]
            print(fresh_arr)
            continue
        
        print("Add diff -> ", t[1]-last[1])
        fresh_arr[ti] = (last[0], t[1])
        ids += t[1] - last[1]
    else:
        print("Add only this", t[1]-t[0]+1)
        ids += t[1] - t[0] + 1
    
    ti += 1

print("Part 2: ", ids)