from flask import Flask
from dotenv import load_dotenv
import sqlite3
import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

load_dotenv()
app = Flask(__name__)

GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

drugsList, drugDict, drugIn = [], {}, {}

@app.route("/drugs")
def allDrugs():

    return drugsList

@app.route('/drugint/<string:id1>/<string:id2>')
def interaction(id1, id2):
    id1, id2 = (id2, id1) if int(id2) < int(id1) else (id1, id2)
    level = drugIn[id1 + "_" + id2]
    if level == "Major" or level == "Moderate":
        response = model.generate_content("I am taking following two medicines:  " + drugDict[int(id1)]  + "and" + drugDict[int(id2)] + ". Their interaction level is " + level + ". Why? Just mention in detail in 1 line", safety_settings={HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE})
        print(response.candidates)
        return { 'level': level, 'reason': response.text }
    return { 'level': level, 'reason': '' }


if __name__ == '__main__':
    conn = sqlite3.connect("drugdata.db")  # Use this path for Vercel deployment, not working on local, need to fix
    c = conn.cursor()

	# Fetch the values of the 'drugsList' table from the SQLITE database
    c.execute("SELECT * FROM drugsList")

	# Get the results and store to dictionary
    rows = c.fetchall()

	# Iterate over the rows and create key-value pairs for each row
    for row in rows:
        drugsList.append({'id': row[0], 'name': row[1]})
        drugDict[row[0]] = row[1]

    c.execute("SELECT * FROM interactionTable")
    rows = c.fetchall()
    if len(rows) > 0:
        for row in rows:
            if row[0] == row[1]:
                continue
            id1, id2 = (str(row[0]), str(row[1])) if int(row[0]) < int(row[1]) else (str(row[1]), str(row[0]))
            temp = id1 + "_" + id2
            drugIn[temp] = row[2]
    
    # print(drugIn)#1971_893
    
    app.run(debug=True, port=5003, host='0.0.0.0')
