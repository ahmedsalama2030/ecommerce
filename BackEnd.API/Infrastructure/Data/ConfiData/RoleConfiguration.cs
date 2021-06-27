using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data
{
    class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        private Guid RoleAdminId = Guid.Parse("B22698B1-42A2-4115-9634-1C2D1E2AC5F8");
        private Guid RoleUserId = Guid.Parse("B22694B8-42A2-4115-9631-1C2D1E2AC5F7");

        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");
            builder.HasData(
               new Role { Id = RoleAdminId, Name = "admin", NameAr = "أدمن", NormalizedName = "ADMIN" },
               new Role { Id = RoleUserId, Name = "user", NameAr = "مستخدم", NormalizedName = "USER" }
             );
        }
    }
}
