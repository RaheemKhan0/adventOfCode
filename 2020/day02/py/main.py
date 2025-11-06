from pathlib import Path;

HERE = Path(__file__).resolve();
DAY_DIR = HERE.parent.parent;



lines = list()
validinputs = 0
with open(f'{DAY_DIR}/day02.txt', 'r') as inputs:
    for line in inputs:
        print(f'line : {line}')
        parts = line.split(' ')
        if len(parts) != 3:
            continue
        print(f'parts : {parts}')
        limitarr = parts[0].split('-')
        print(f'limit arr : {limitarr}')
        upperLimit = int(limitarr[1])
        lowerLimit = int(limitarr[0])
        letter = parts[1][0]
        charcount = 0
        for char in parts[2]:
            if char == letter:
                charcount += 1
        print(f'char count : {charcount}')
        print(f'lower Limit : {lowerLimit} , upper Limit : {upperLimit}')
        if charcount >= lowerLimit and charcount <= upperLimit:
            validinputs += 1


print(f'valid inputs : {validinputs}')
