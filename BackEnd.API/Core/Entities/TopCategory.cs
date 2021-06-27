using System;
using Core.Common;

namespace Core.Entities
{
    public class TopCategory:BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}