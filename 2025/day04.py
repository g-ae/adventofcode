lines = []
with open("data.txt") as f:
    lines = f.readlines()

total = 0

lines = [x.replace("\n", "") for x in lines]

def test_tp(line_i, col_i):
    if line_i < 0 or line_i >= len(lines) or col_i < 0 or col_i >= len(lines[0]):
        return 0
    #print("\t", line_i, col_i, lines[line_i][col_i], lines[line_i][col_i] == "@")
    return 1 if lines[line_i][col_i] == "@" else 0
    
# PART 1
for (li, l) in enumerate(lines):
    for (ci, c) in enumerate(l):
        if c == ".":
            continue
        
        #print("testing", li, ci)
    
        # check cmb autour
        autour = 0
        
        autour += test_tp(li-1, ci-1)
        autour += test_tp(li-1, ci)
        autour += test_tp(li-1, ci+1)
        autour += test_tp(li, ci-1)
        autour += test_tp(li, ci+1)
        autour += test_tp(li+1, ci-1)
        autour += test_tp(li+1, ci)
        autour += test_tp(li+1, ci+1)
        
        if autour < 4:
            #print("\t\t", li, ci, autour)
            total += 1

print("Part 1:",total)

# PART 2 -> approche récursive de la partie 1
def rec():
    removed = 0
    for (li, l) in enumerate(lines):
        for (ci, c) in enumerate(l):
            if c == ".":
                continue
            
            #print("testing", li, ci)
        
            # check cmb autour
            autour = 0
            
            autour += test_tp(li-1, ci-1)
            autour += test_tp(li-1, ci)
            autour += test_tp(li-1, ci+1)
            autour += test_tp(li, ci-1)
            autour += test_tp(li, ci+1)
            autour += test_tp(li+1, ci-1)
            autour += test_tp(li+1, ci)
            autour += test_tp(li+1, ci+1)
            
            if autour < 4:
                #print("\t\t", li, ci, autour)
                removed += 1
                lines[li] = lines[li][:ci] + "." + lines[li][ci+1:]
    if removed == 0:
        return 0
    return removed + rec()
                
print("Part 2:",rec())
