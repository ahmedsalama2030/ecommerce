using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Interfaces.Factory
{
  public  interface IServicesLocator
    {
        T Get<T>();
    }
}
