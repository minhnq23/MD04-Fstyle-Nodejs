# MD-04-Fstyle-Nodejs-Server

URL API: 
Category: 
- getall : /api/categories , method: get
- create :  /api/categroies , method: posst, req.body: idAdmin(id user admin),name,description
- update: /api/categroies/:id , method:put, param.id: id category, req.body: idAdmin,name,descrtipn
- getOne: /api/categroies/:id, method:get, param.id: id category
Product:
- getall: /api/products , method: get
- create: /api/products , method: post, param.body: field of product model,
- update: /api/products/:id , method: put ,param.id: id product, req.body: field of product model update,
- getOne: /api/products/:id , method: get , param.id: id product