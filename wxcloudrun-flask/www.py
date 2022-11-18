

from wxcloudrun import app
from wxcloudrun.comment.comment import comment
from wxcloudrun.note.note import note
from wxcloudrun.user.user import user

app.register_blueprint(note)
app.register_blueprint(user)
app.register_blueprint(comment)