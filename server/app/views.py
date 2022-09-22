import os

from django.http.response import FileResponse, HttpResponseNotFound
from django.views.generic import ListView


class ServeAssestView(ListView):
    def get(self, request, *args, **kw):
        filename = os.path.basename(request.path_info)
        public_path = os.path.realpath('./app/static/assets')
        path = os.path.join(public_path, filename)

        if not os.path.exists(path):
            print("Path doesn't exist %s", path)
            return HttpResponseNotFound()

        return FileResponse(open(path, 'rb'))
