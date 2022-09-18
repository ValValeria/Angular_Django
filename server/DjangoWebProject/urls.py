from app.view_pack.add_product import AddProductView, UpdateProductView
from app.view_pack.admin_users import AdminDeleteUsers, AdminUsers, AdminViewUser
from app.view_pack.admin_view import AdminProductImages
from app.view_pack.authenticate import SignUpView, LoginView
from app.view_pack.carousel_view import CarouselView, CarouselDownloadView, CarouselDeleteView
from app.view_pack.categories import CategoryView
from app.view_pack.comment_view import Comment_View, CommentList_View
from app.view_pack.likes_view import ProductLikesDelete, ProductLikesShow, ProductLikes
from app.view_pack.order_view import Delete_Order, Order_View, Get_Order, Order_Buy
from app.view_pack.products import ProductDeleteView
from app.view_pack.products import ProductInfo, ProductsView, ProductView, ProductSort, ProductInfoBrands, \
    ProductAvailableCount
from app.view_pack.search_view import Search
from app.views import ChangeAvatar, UserProfile, SendLetter, NotFound
from app.views import ServeAssestView
from django.urls import re_path

urlpatterns = [
    re_path(r"^api/product-count", ProductAvailableCount.as_view()),
    re_path(r"^api/send-letter", SendLetter.as_view()),
    re_path(r"^api/delete-likes/", ProductLikesDelete.as_view()),
    re_path(r"^api/info-products/", ProductInfo.as_view()),
    re_path(r"^api/products", ProductsView.as_view()),
    re_path(r"^api/signup", SignUpView.as_view()),
    re_path(r"^api/login", LoginView.as_view()),
    re_path(r"^api/product/(?P<pk>\d+)", ProductView.as_view()),
    re_path(r"^api/product", AddProductView.as_view()),
    re_path(r"^api/addcomment$", Comment_View.as_view()),
    re_path(r"^api/sort/", ProductSort.as_view()),
    re_path(r"^api/getlikes/", ProductLikesShow.as_view()),
    re_path(r"^api/addorder", Order_View.as_view()),
    re_path(r"^api/deleteorder", Delete_Order.as_view()),
    re_path(r"^api/get-orders/(?P<user_id>\d+)", Get_Order.as_view()),
    re_path(r"^api/comments/(?P<post_id>\d+)", CommentList_View.as_view()),
    re_path(r"^api/search", Search.as_view()),
    re_path(r"^api/getbrands/", ProductInfoBrands.as_view()),
    re_path(r"^api/addlike", ProductLikes.as_view()),
    re_path(r"^api/buy-products", Order_Buy.as_view()),
    re_path(r"^api/delete-user/(?P<number>\d+)", AdminDeleteUsers.as_view()),
    re_path(r"^api/user-info", UserProfile.as_view()),
    re_path(r"^api/user/(?P<number>\d+)", AdminViewUser.as_view()),
    re_path(r"^api/delete-carousel/(?P<carousel_id>\d+)", CarouselDeleteView.as_view()),
    re_path(r"^api/carousel/download/(?P<type>[a-z]+)", CarouselDownloadView.as_view()),
    re_path(r"^api/carousel/(?P<type>[a-z]+)", CarouselView.as_view()),
    re_path(r"^api/users", AdminUsers.as_view()),
    re_path(r"^api/change-product/", UpdateProductView.as_view()),
    re_path(r"^api/change-avatar", ChangeAvatar.as_view()),
    re_path(r"^api/delete-product", ProductDeleteView.as_view()),
    re_path(r'^api/categories', CategoryView.as_view()),
    re_path(r'^admin/products/<int:id>/addimages', AdminProductImages.as_view()),
    re_path(r"^assets/(?P<filename>\w+)", ServeAssestView.as_view()),
    re_path(r"^((?!app/static).)*$", NotFound.as_view())
]
