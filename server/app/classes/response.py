from typing import Optional, Dict


class Data(object):
    __data: Dict = {}

    def __init__(self) -> None:
        super().__init__()

    @property
    def data(self) -> Dict:
        return self.__data


class Info(object):
    __url = ""

    def __init__(self, url: str):
        self.__url = url

    def __str__(self):
        return {"url": self.__url}


class Response(object):
    __errors = []
    __info: Optional[Info] = None
    __data: Optional[Data] = None

    def __str__(self):
        return {"errors": self.__errors,
                "info": self.__info,
                "data": self.__data}

    @property
    def data(self):
        return self.__data
