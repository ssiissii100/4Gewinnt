from flask import Flask, render_template, jsonify, request
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='viergewinnt'
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/statistic')
def statistic():
    return render_template('statistic.html')

@app.route('/api/colors', methods=['GET'])
def get_colors():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM colors")
    colors = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(colors)


@app.route('/api/game/move/<int:field_id>', methods=['POST'])
def make_move(field_id):
    try:
        data = request.get_json()
        player_id = data.get('player_id')

        conn = get_db_connection()
        cursor = conn.cursor()

        query = "UPDATE activgame SET PlayerFK = %s WHERE ID = %s"
        cursor.execute(query, (player_id, field_id))

        conn.commit()
        cursor.close()
        conn.close()

        # Check win condition here (you need to implement this logic)
        # win = check_win_condition()

        return jsonify({'status': 'Move made'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/game/reset', methods=['POST'])
def reset_game():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "UPDATE activgame SET PlayerFK = NULL"
        cursor.execute(query)

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'status': 'Game reset'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT s.ID, p.ColorFK as Winner, s.Playtime FROM statistic s LEFT JOIN players p ON s.PlayerFK = p.ID")
    statistics = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for stat in statistics:
        playtime = str(stat['Playtime'])
        winner = 'P1' if stat['Winner'] == 1 else 'P2'
        result.append({'ID': stat['ID'], 'Winner': winner, 'Playtime': playtime})
    
    return jsonify(result)

@app.route('/api/statistics', methods=['DELETE'])
def reset_statistics():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM statistic")
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'status': 'Statistics reset'})

if __name__ == '__main__':
    app.run(debug=True)
