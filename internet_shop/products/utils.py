import datetime
import uuid
import os


def get_current_year():
    return datetime.date.today().year


def path_and_rename_announcement_image(instance, filename):
    upload_to = "announcements_image"
    ext = filename.split(".")[-1]
    filename = "{}.{}".format(uuid.uuid4().hex, ext)

    return os.path.join(upload_to, instance.user.email, filename)
