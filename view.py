from flask import Flask, jsonify, request

from user.user import selectUser, insertUser

app = Flask(__name__)
app.debug = True
app.config['JSON_AS_ASCII'] = False
app.config['JSONIFY_MIMETYPE'] = "application/json;charset=utf-8"
app.secret_key = 'service'


@app.route('/getUserInfo', methods=['GET', 'POST'])
def getUserInfo():
    """获取用户信息"""
    result = selectUser(request.args.get('nickName'),
                        request.args.get('avatarUrl'))
    return jsonify(result)


@app.route('/insertUserInfo', methods=['GET', 'POST'])
def insertUserInfo():
    """插入新授权用户"""
    insertUser(request.args.get('nickName'), request.args.get('avatarUrl'), request.args.get('city'),
                request.args.get('country'), request.args.get('province'))
    return jsonify("用户授权成功！")


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
