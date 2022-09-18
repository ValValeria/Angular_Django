import enum
from typing import Optional, Dict, Any


class ResponseStatus(enum.Enum):
    SUCCESS = "ok",
    UNKNOWN = "unknown",
    ERROR = "error"


class Data(object):
    __result: Dict = {}

    def __init__(self) -> None:
        super().__init__()

    def as_dict(self):
        return {"result": self.__result}

    @property
    def result(self) -> Dict:
        return self.__result


class Info(object):
    __url: str = ""
    __status: ResponseStatus

    def __init__(self):
        self.__url = ""
        self.__status = ResponseStatus.ERROR

    def as_dict(self):
        return {"url": self.__url}

    @property
    def url(self):
        return self.__url

    @property
    def status(self):
        return self.__status

    @status.setter
    def status(self, status: ResponseStatus):
        self.status = status


class Response(object):
    __errors = []
    __info: Optional[Info] = None
    __data: Optional[Data] = None

    def __init__(self):
        self.__data = Data()
        self.__info = Info()

    def as_dict(self):
        return {"errors": self.__errors,
                "info": self.__info.as_dict(),
                "data": self.__data.as_dict()}

    @property
    def data(self):
        return self.__data

    @property
    def errors(self) -> list[Any]:
        return self.__errors

    def status(self, status: ResponseStatus):
        self.__info.status = status
