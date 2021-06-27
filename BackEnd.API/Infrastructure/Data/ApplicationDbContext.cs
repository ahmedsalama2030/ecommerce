using System.Reflection;
using System.Drawing;
using System;
using Core.Dtos.ProductsBestSeller;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Core.Entities.pay;

namespace Infrastructure.Data
{
 
    public class ApplicationDbContext:IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
    {
         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
       public DbSet<Product> Products { set; get; }
       public DbSet<Category>   Categories{ set; get; }
       public DbSet<Order> Orders  { set; get; }
       public DbSet<ProductColor> ProductColors   { set; get; }
       public DbSet<ProductImage> ProductImages  { set; get; }
       public DbSet<TopCategory> TopCategories  { set; get; }
       public DbSet<ProductViewRecently> ProductsViewRecently  { set; get; }
       public DbSet<ProductBestSeller> ProductsBestSeller  { set; get; }
       public DbSet<ShoppingCart> ShoppingCarts  { set; get; }
       public DbSet<ProductOrder> ProductOrders  { set; get; }
       public DbSet<Payment> Payments  { set; get; }
 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
             modelBuilder.Entity<UserRole>(
                userRole =>
                {
                    userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                    userRole.HasOne(ur => ur.Role)
                     .WithMany(r => r.UserRole).HasForeignKey(ur => ur.RoleId)
                     .IsRequired();
                    userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRole)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();

                }
           );
            modelBuilder.Entity<UserRole>().ToTable("UserRoles");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<ProductOrder>(
                ProductOrder=>{
                    ProductOrder.HasKey(po => new {po.ProductId,po.OrderId});
                    ProductOrder.HasOne(po=>po.Product).WithMany(p=>p.ProductOrders).HasForeignKey(po=>po.ProductId).IsRequired();
                    ProductOrder.HasOne(po=>po.Order).WithMany(o=>o.ProductOrders).HasForeignKey(po=>po.OrderId).IsRequired();
                }
            );
        } 

    }
}