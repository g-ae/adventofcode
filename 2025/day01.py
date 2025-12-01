import math

lines = []
with open("input.txt") as f:
    lines = f.readlines()

lines = [x.replace('\n', '') for x in lines]
dial = 50

nums = {}
p2_nums = 0
for line in lines:
    num = int(line[1:])
    if line[0] == "L":
        was_0 = dial == 0
        # L
        dial -= num
        
        if dial <= 0:
            #print(dial, "from", dial + num, "added", 1 + math.floor(abs(dial/100)))
            p2_nums += (0 if was_0 else 1) + math.floor(abs(dial/100))
    else:
        # R
        dial += num
        
        if dial > 99:
            #print(dial, "from", dial - num, "added", math.floor(abs(dial/100)))
            p2_nums += math.floor(abs(dial/100))
    
    if dial < 0 or dial > 99:
        dial %= 100
    #print("end",dial)
    
    if dial in nums:
        nums[dial] += 1
    else:
        nums[dial] = 1

print(f"Part 1 Password: {nums[0]}")
print(f"Part 2 Password: {p2_nums}")