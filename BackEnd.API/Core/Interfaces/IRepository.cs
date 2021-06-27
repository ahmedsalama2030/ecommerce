using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
 using Microsoft.EntityFrameworkCore;
 
namespace Core.Interfaces
{
   public interface IRepository<T> where T : class
    { 

        Task<T> GetByIdAsync(Guid id);
        Task<T> FindBy(Expression<Func<T, bool>> whereCondition,params Expression<Func<T, object>>[] includes);
         void Add(T entity);
        void Update(T entity);
       void Delete(T entity);
       void DeleteRange(params T[] entities);

         DbSet<T> Table();
         IQueryable<T> GetQueryable();
         IQueryable<T> GetQueryable(params Expression<Func<T, object>>[] includes);
         IQueryable<T>  GetQueryable(Expression<System.Func<T, bool>> whereCondition);
public    IQueryable<T>  GetQueryable(Expression<System.Func<T, bool>> whereCondition,params Expression<Func<T, object>>[] includes);
              //Search
        
         Task<IEnumerable<T>> SearchAsync(Expression<Func<T, bool>> whereCondition);  
        Task<IEnumerable<T>>  SearchAsync(Expression<Func<T, bool>> whereCondition, params Expression<Func<T, object>>[] includes);

           //Get All
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> whereCondition);
         int GetCount(Expression<Func<T, bool>> whereCondition);
       bool IsFound(Expression<Func<T, bool>> whereCondition);
         //SingleOrDefault
         Task<T> SingleOrDefaultAsync(Expression<Func<T, bool>> whereCondition);
           //Include
      Task<IEnumerable<T>>  IncludeAsync(params Expression<Func<T, object>>[] includes);
        IQueryable<T> IncludeIQueryableAsync( params Expression<Func<T, object>>[] includes);
         
        //OrderBy
         IEnumerable<T> OrderBy(Expression<Func<T, bool>> whereCondition);
        //save
          
   

         
    }
}