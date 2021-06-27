using System;
using System.Collections.Generic;
using AutoMapper;
using Core.Entities;
using Newtonsoft.Json;
using Core.Dtos;
using System.Linq;

namespace Infrastructure.Data
{
    public class TrailData
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public TrailData(ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void TrailCategory()
        {

            var CategoryData = System.IO.File.ReadAllText("../Infrastructure/Data/Category.json");
            var Categories = JsonConvert.DeserializeObject<List<Category>>(CategoryData);
            foreach (var Category in Categories)
            {
                Category.IsTop = true;
                _context.Add(Category);
            }
            _context.SaveChanges();

        }
        public void TrailProduct()
        {
            var Categories = _context.Categories.ToList();

            if (Categories != null)
            {
                var ProductData = System.IO.File.ReadAllText("../Infrastructure/Data/Products.json");
                var ProductsListDto = JsonConvert.DeserializeObject<List<ProductListJsonDto>>(ProductData);
                var products = _mapper.Map<List<Product>>(ProductsListDto);

                foreach (var Product in products)
                {
                    int randomIndex = new Random().Next(Categories.Count);
                    Product.CategoryId = Categories[randomIndex].Id;
                    _context.Products.Add(Product);
                }
                _context.SaveChanges();
            }
        }

        public void TrailTopCategory()
        {
            var Categories = _context.Categories.ToList();
            foreach (var Category in Categories)
            {
                var topCategory = new TopCategory();
                topCategory.CategoryId = Category.Id;
                topCategory.CreatedDate = DateTime.Now;
                _context.TopCategories.Add(topCategory);
            }
            _context.SaveChanges();

        }
        public void TrailRecentView()
        {
            var products = _context.Products.Take(50).ToList();
            foreach (var product in products)
            {
                var productsViewRecently = new ProductViewRecently();
                productsViewRecently.ProductId = product.Id;
                productsViewRecently.DateView = DateTime.Now;
                productsViewRecently.CreatedDate = DateTime.Now;

                _context.ProductsViewRecently.Add(productsViewRecently);
            }
            _context.SaveChanges();
        }
        public void TrailBestSeller()
        {
            var products = _context.Products.Take(50).ToList();
            foreach (var product in products)
            {
                var bestSeller = new ProductBestSeller();
                bestSeller.ProductId = product.Id;
                bestSeller.CreatedDate = DateTime.Now;
                _context.ProductsBestSeller.Add(bestSeller);
            }
            _context.SaveChanges();
        }
        public void TrailProductImage()
        {
            var products = _context.Products.ToList();
            string[] images = { "https://res.cloudinary.com/dxb44v7tw/image/upload/v1615840372/assets/1_wztnaz.jpg", "https://res.cloudinary.com/dxb44v7tw/image/upload/v1615840372/assets/3_briy8h.jpg", "https://res.cloudinary.com/dxb44v7tw/image/upload/v1615840372/assets/2_d7apzj.jpg" };
            for (int i = 0; i < products.Count; i++)
            {
                for (int j = 0; j < images.Length; j++)
                {
                    var image = new ProductImage();
                    if (j == 0)
                    {
                        image.IsMain = true;
                    }
                    image.URL = images[j];
                    image.DateAdded = DateTime.Now;
                    image.ProductId = products[i].Id;
                    _context.ProductImages.Add(image);
                }


            }
            _context.SaveChanges();


        }
        public void TrailShoppingCart()
        {
            var products = _context.Products.Take(10).ToList();
            User user=_context.Users.FirstOrDefault();
            foreach (var product in products)
            {
                var shoppingCart = new ShoppingCart();
                shoppingCart.ProductId = product.Id;
                shoppingCart.CreatedDate = DateTime.Now;
                shoppingCart.Quantity = 2;
                shoppingCart.UserId=user.Id;
                _context.ShoppingCarts.Add(shoppingCart);

            }
            _context.SaveChanges();
        }
        public void TrailOrder()
        {
                User user=_context.Users.FirstOrDefault();

                var Order = new Order();
                  Order.TotalPrice=20;
                  Order.TotalShipping=15;
                   Order.DateOrder=DateTime.Now; 
                  Order.DateArrive=DateTime.Now.AddDays(2); 
                  Order.CreatedDate=DateTime.Now; 
                  Order.UserId=user.Id;
                 _context.Orders.Add(Order);
                _context.SaveChanges();

       

            
        }
        public void TrailProductOrder(){
     var products = _context.Products.Take(10).ToList();
 
           Order order=_context.Orders.FirstOrDefault();
           foreach (var product in products){
               var productOrder=new ProductOrder();
               productOrder.Quantity=2;
                 productOrder.OrderId=order.Id;
               productOrder.ProductId=product.Id;
                _context.ProductOrders.Add(productOrder);
           }
             _context.SaveChanges();
        }

        public void RunTrialData()
        {
           //TrailCategory();
           //  TrailProduct();
           // TrailTopCategory();
           //TrailRecentView();
           //TrailProductImage();
           //TrailBestSeller();
           //  TrailShoppingCart();  
           //  TrailOrder();
           // TrailProductOrder(); 
            
        }
          }
}