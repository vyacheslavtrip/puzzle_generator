from flask import Flask
from flask import send_from_directory
from flask import request
from flask import jsonify
from flask_cors import CORS
from openai import OpenAI
import openai

client = OpenAI(api_key = "")

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return send_from_directory("static", "index.html")
    
@app.route("/styles.css")
def styles():
    return send_from_directory("static", "styles.css")

@app.route("/image-icon.png")
def icon():
    return send_from_directory("static", "image-icon.png")

@app.route("/script.js")
def script():
    return send_from_directory("static", "script.js")
    
@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Извлечение данных из запроса
        data = request.json
        select1 = data.get('select1')
        select2 = data.get('select2')
        select3 = data.get('select3')
        select4 = data.get('select4')
        text_input = data.get('textArea')

        model = "gpt-4o-mini"
        
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"Сгенерируй небольшую головоломку для днд. Тип: {select1}. Сложность: {select2}. Уровень игроков: {select3}. Награда: {select4}. Ключевые слова: {text_input}"
            }
        ]
        
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0
        )
        
        result_text = response.choices[0].message.content

        return jsonify({'text': result_text})

    except Exception as e:
        print(f"Error: {e}")  # Добавьте это для отладки
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)    
