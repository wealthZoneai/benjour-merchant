

const endpoints = {

 login: 'api/Benjour/auth/login/merchant',
 register: 'api/Benjour/auth/register/merchant',
 verifyUseremail: 'api/Benjour/auth/verify/merchant',
 AddCategory: 'Merchant',
 deleteCategory: 'Merchant',
 AddCategoryItem: 'Merchant/menuItem',
 UpdateCategoryItem: 'Merchant/menuItem/update/',
 deleteCategoryItem: 'Merchant/menuItem/delete',
 searchCategoryItem: 'Search/Food?keyword=',
 AllCategory: 'Merchant/getAllMenu',
 AllCategoryItems: 'Merchant/menuItem/getByMenu/',

 //... orders endpoints
 GetAllOrders: 'orders/merchant',
 UpdateOrderStatus: 'Merchant/orders/updateStatus',
 GetByOrderStatus: 'orders/GetByOrderStatus?merchantId=1&orderStatus=',
 GetSearchByOrder: 'orders/searchbar?merchantId=',
 GetStatusOrder: 'orders/getAllStatusCounts?merchantId=',

}

export default endpoints