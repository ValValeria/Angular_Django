import enum
from typing import Optional, Dict, Any, Union, List

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import UserModel

from server.app.classes.UserParser import UserParser


class ResponseStatus(enum.Enum):
    SUCCESS = "ok",
    UNKNOWN = "unknown",
    ERROR = "error"


class UserStatus(enum.Enum):
    GUEST = "guest"
    USER = "user"
    ADMIN = "admin"


class Data(object):
    __result: Union[Dict, List] = {}

    def __init__(self) -> None:
        super().__init__()

    def as_dict(self) -> Dict:
        key = "result"
        if isinstance(self.__result, list):
            key = "results"
        return {key: self.__result}

    @property
    def result(self) -> Dict:
        return self.__result


class Info(object):
    __url: str = ""
    __status: ResponseStatus
    __additional_info = {}

    def __init__(self):
        self.__url = ""
        self.__status = ResponseStatus.UNKNOWN

    def as_dict(self) -> Dict:
        return {"url": self.__url,
                "status": self.__status.name,
                "additional_info": self.__additional_info}

    @property
    def url(self):
        return self.__url

    @property
    def status(self):
        return self.__status

    @property
    def additional_info(self):
        return self.__additional_info

    @status.setter
    def status(self, status: ResponseStatus):
        self.status = status


class AuthInfo(object):
    __user: Optional[UserModel] = None
    __status: Optional[UserStatus] = None

    def __init__(self):
        self.__user = get_user_model()
        self.__status = UserStatus.GUEST

    @property
    def user(self):
        return self.__user

    @user.setter
    def user(self, user):
        self.__user = user

    @property
    def status(self):
        return self.__status

    @status.setter
    def status(self, val):
        self.__status = val

    def as_dict(self):
        return {
            "user": UserParser(self.user).get_user(),
            "status": self.__status
        }


class Response(object):
    __errors = []
    __info: Optional[Info] = None
    __data: Optional[Data] = None
    __auth_info: Optional[AuthInfo] = None

    def __init__(self):
        self.__data = Data()
        self.__info = Info()
        self.__auth_info = AuthInfo()

    def as_dict(self) -> Dict:
        return {"errors": self.__errors,
                "info": self.__info.as_dict(),
                "data": self.__data.as_dict()}

    @property
    def data(self):
        return self.__data

    @property
    def errors(self) -> list[Any]:
        return self.__errors

    @property
    def info(self):
        return self.__info

    @property
    def auth_info(self):
        return self.__auth_info

    def status(self, status: ResponseStatus):
        self.__info.status = status
