import csv
import json

csvfile = open('q_quora.csv', 'r')
jsonfile = open('q_quora.json', 'w')

fieldnames = ("id","qid1","qid2","question1", "question2", "is_duplicate")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
