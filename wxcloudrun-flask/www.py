from wxcloudrun import app

from wxcloudrun.comment.comment import comment
from wxcloudrun.note.note import note
from wxcloudrun.user.user import user
from wxcloudrun.support.support import support
from wxcloudrun.follow.follow import follow
from wxcloudrun.recommend.recommend import recommend

app.register_blueprint(note)
app.register_blueprint(user)
app.register_blueprint(comment)
app.register_blueprint(support)
app.register_blueprint(follow)
app.register_blueprint(recommend)