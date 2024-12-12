# Get priority value from char
def getPriority(item: str):
    # a-z,  A-Z
    # 1-26, 27-52
    char = ord(item)
    priority = 0
    if char >= 97 and char <= 122:
        priority = char - 96
    elif char >= 65 and char <= 90:
        priority = char - 64 + 26
    return priority

# Searches char that is common between 2 strings
def similar2(str1: str, str2: str):
    out = []
    for s in str1:
        if str2.find(s) != -1:
            out.append(s)
    return out

# Searches char that is common between 3 strings
def similar3(str1: str, str2: str, str3: str) -> str:
    out = []
    final = []

    # Search similarity between first two strings
    for s in similar2(str1,str2):
        out.append(s)
    
    # Look for similarities between the second and third
    for s in similar2(str2, str3):
        # Only accept value if it was present in the first string aswell
        if out.__contains__(s):
            final.append(s)

    return final[0]

# Only execute if meant to
if (__name__ == "__main__"):
    f = open("data.txt")
    data = f.read().split('\n')
    f.close()

    # Task 1
    count = 0

    for line in data:
        used = ""
        r1 = line[:int(len(line)/2)]
        r2 = line[int(len(line)/2):]
        if (r1 + r2 != line):
            print(line,r1,r2)
        sim = similar2(r1,r2)

        for s in sim:
            if used.find(s) == -1:
                used += s
                count += getPriority(s)

    print("Task 1 : " + str(count))

    # Task 2
    group = []
    count = 0
    arrused = ""

    for line in data:
        group.append(line)
        if (len(group) == 3):
            [g1,g2,g3] = group
            count += getPriority(similar3(g1,g2,g3))
            group = []

    print("Task 2 : " + str(count))