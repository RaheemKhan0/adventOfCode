from pathlib import Path

HERE = Path(__file__).resolve()
DAY_DIR = HERE.parent.parent



values = list()
with open(f"{DAY_DIR}/input.txt", 'r') as inputs:
    for val in inputs:
        values.append(int(val))
print('values ' , values)

for i in range(len(values)):
    for j in range(i, len(values)):
        for z in range(j, len(values)):
            if values[i] + values[j] + values[z] == 2020:
                print(values[i] * values[j] * values[z])
                break
            

