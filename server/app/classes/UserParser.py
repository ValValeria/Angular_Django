class UserParser:
    def __init__(self, user):
        self.__user = user

    def get_user(self):
        avatar = None

        try:
            avatar = self.__user.avatar.photo.url
        except:
            avatar = "/app/static/avatars/blank.jpg"

        data = {
            "email": self.__user.email,
            "avatar": avatar,
            "id": self.__user.id,
            "username": self.__user.username
        }

        if self.__user.is_superuser:
            data['role'] = 'admin'
        elif hasattr(self.__user, 'userdata'):
            data['role'] = self.__user.userdata.status
        else:
            data['role'] = 'user'

        return data
