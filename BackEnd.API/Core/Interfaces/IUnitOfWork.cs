using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUnitOfWork<T> where T : class
    {
         IRepository<T> Table{get;}
         Task <bool> SaveAllAsync();
    }
}