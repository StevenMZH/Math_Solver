import csv
from ecuations import Ecuation

rowIndex = 2

def readEcuation_csv(file, rowIndex):
    with open(file, newline='') as file_csv:

        csvReader = csv.reader(file_csv)
        for idx, row in enumerate(csvReader):
            if idx == rowIndex:
                ecuationData = row[0].split(';')
                return ecuationData[:6]
    return None

def getEcuationsData_csv(file):

    ecuationData = readEcuation_csv(file, rowIndex)

    if ecuationData:
        print(f"\nEcuation  {rowIndex - 1}: {ecuationData[0]} {ecuationData[1]} {ecuationData[2]}")
        print(f"Ecuation Simplified: {ecuationData[3]} = 0")
        print(f"Ecuation Evaluated in {ecuationData[4]}: {ecuationData[5]} \n")

        ec = Ecuation(ecuationData[0], ecuationData[2], ecuationData[1])
        print(f"Ecuation Expanded by Code: {ec.getExpanded()} = 0")
        print(f"Ecuation Factorized by Code: {ec.getFactorized()} = 0")
        print(f"Ecuation Evaluated in {ecuationData[4]} by Code: { ec.getEval('x', ecuationData[4] ) }")
        

    else:
        print("No se encontró la row especificada.")

getEcuationsData_csv('ecuations.csv')
