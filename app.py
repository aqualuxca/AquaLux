from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # This must exist in templates/index.html

if __name__ == '__main__':
    # This runs only when using `python app.py` locally. On Render, Gunicorn handles it.
    app.run(host='0.0.0.0', port=5000)
