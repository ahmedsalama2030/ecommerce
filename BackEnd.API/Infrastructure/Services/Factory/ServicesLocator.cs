using Core.Interfaces.Factory;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Services.Factory
{
    public class ServicesLocator : IServicesLocator
    {
        public T Get<T>()
        {
            var objectType = typeof(T);
            return (T)Activator.CreateInstance(objectType);
        }
    }
}
