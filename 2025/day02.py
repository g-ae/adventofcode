lines = []
with open("data.txt") as f:
    lines = f.readlines()

lines = [x.replace('\n', '') for x in lines]
lines = ''.join(lines)

total = 0

for x in lines.split(','):
    #print("x", x)
    if x == '':
        #print("continued")
        continue
    spl = x.split('-')
    start = int(spl[0])
    end = int(spl[1])
    
    #print("from", start, "to", end)
    for num in range(start,end+1):
        s = str(num)
        if s == s[:int(len(s)/2)]*2:
            total += num
            #print(num)

print(total)

# PART 2
 
total = 0

for x in lines.split(','):
    print("x", x)
    if x == '':
        continue
    spl = x.split('-')
    start = int(spl[0])
    end = int(spl[1])
    
    #print("from", start, "to", end)
    for num in range(start,end+1):
        if num < 10:
            continue
        substring = ""
        s = str(num)
        i = 0
        while len(substring) < len(s) / 2:
            substring += s[i]
            # test si c'est un substring
            if substring * int(len(s) / len(substring)) == s:
                #print("\t\tréussi !", substring, substring * int(len(s) / len(substring)), "==", s)
                total += num
                print("\tfound",num)
                break
            
            i+= 1
            
print(total)